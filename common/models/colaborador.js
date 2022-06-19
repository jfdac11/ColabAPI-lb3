'use strict';

module.exports = function(Colaborador) {
    Colaborador.getMedidasData = async function (data, id) {
        var dataAux = new Date(data);
        var dataAux2 = new Date(data);
        dataAux2.setDate(dataAux.getDate() + 1);
    
        const collection = Colaborador.getConnector().collection('Colaborador');
        const cursor = collection.aggregate({
          where: { _id: id },
          aggregate: [
            {
              $unwind: {
                path: "$historicoMedidas",
              },
            },
            {
              $match: {
                $and: [
                  {
                    "historicoMedidas.dataHora": {
                      $gte: dataAux,
                    },
                  },
                  {
                    "historicoMedidas.dataHora": {
                      $lt: dataAux2,
                    },
                  },
                ],
              },
            },
            {
              $project: {
                _id: 0,
                peso: "$historicoMedidas.peso",
                altura: "$historicoMedidas.altura",
                dataHora: "$historicoMedidas.dataHora",
                imc: "$historicoMedidas.imc",
              },
            },
            {
              $sort:{
                dataHora: -1
              }
            }
          ],
        })

        return cursor.toArray();
      };
    
    Colaborador.remoteMethod("getMedidasData", {
        description: "Retorna as medidas de um colaborador em uma data específica",
        accepts: [
            {
            arg: "data",
            type: "string",
            required: true,
            },
            {
            arg: "id",
            type: "string",
            required: true,
            },
        ],
        http: {
            path: "/:id/Medidas/:data",
            verb: "get",
        },
        returns: {
            type: [
            {
                peso: {
                type: "number",
                },
                altura: {
                type: "number",
                },
                dataHora: {
                type: "date",
                },
                imc: {
                type: {
                    valor: { type: "number" },
                    classificacao: { type: "string" },
                },
                },
            },
            ],
            root: true,
        },
    });

    Colaborador.updateMedida = async function (id, novaMedida) {
        return Colaborador.findById(id).then(function (colab) {
            var novoHistoricoMedidas = [];
            novoHistoricoMedidas = colab.historicoMedidas;

            if(colab.medida !== null){
            novoHistoricoMedidas.push({
                peso: colab.medida.peso,
                altura: colab.medida.altura,
                dataHora: colab.medida.dataHora,
                imc: {
                valor: colab.medida.imc.valor,
                classificacoa: colab.medida.imc.classificacao,
                },
            })
            }

            colab.updateAttributes(
            {
                medida: {
                peso: novaMedida.peso,
                altura: novaMedida.altura,
                dataHora: novaMedida.dataHora,
                imc: novaMedida.imc,
                },
                historicoMedidas: novoHistoricoMedidas,
            },
            function (err, instance) {
                console.log(instance);
            }
            );
        });
    };
    Colaborador.remoteMethod("updateMedida", {
        description:
            "Atualiza a medida de um colaborador e adiciona a antiga ao histórico",
        accepts: [
            {
            arg: "id",
            type: "string",
            required: true,
            },
            {
            arg: "novaMedida",
            type: {
                peso: {
                type: "number",
                },
                altura: {
                type: "number",
                },
                dataHora: {
                type: "date",
                },
                imc: {
                type: {
                    valor: { type: "number" },
                    classificacao: { type: "string" },
                },
                },
            },
            required: true,
            http: {
                source: "body",
            },
            },
        ],
        http: {
            path: "/:id/Medida",
            verb: "put",
        },
        returns: {
            arg: "novaMedida",
            type: {
            peso: {
                type: "number",
            },
            altura: {
                type: "number",
            },
            dataHora: {
                type: "date",
            },
            imc: {
                type: {
                valor: { type: "number" },
                classificacao: { type: "string" },
                },
            },
            },
        },
    });

    Colaborador.getResumoImc = async function () {
        const collection = Colaborador.getConnector().collection('Colaborador');
        const cursor = collection.aggregate({
            aggregate: [
            { $sortByCount: "$medida.imc.classificacao" },
            {
                $project: {
                _id: 0,
                x: "$_id",
                y: "$count",
                },
            },
            ],
        });

            return cursor.toArray();
    };

    Colaborador.remoteMethod("getResumoImc", {
        description: "Retorna o número de colaboradores por imc",
        http: {
            path: "/Medidas/resumo/imc",
            verb: "get",
        },
        returns: {
            type: [{}],
            root: true,
        },
    });

    Colaborador.getNumCadastros = async function () {
        const collection = Colaborador.getConnector().collection('Colaborador');
        const cursor = collection.aggregate({
            aggregate: [
            {
                $project: {
                dataCadastro: {
                    $dateFromParts: {
                    year: { $year: "$dataCadastro" },
                    month: { $month: "$dataCadastro" },
                    day: { $dayOfMonth: "$dataCadastro" },
                    hour: 0,
                    },
                },
                },
            },
            {
                $facet: {
                anual: [
                    {
                    $group: {
                        _id: { $dateFromParts: { year: { $year: "$dataCadastro" } } },
                        count: { $sum: 1 },
                    },
                    },
                    { $sort: { _id: -1 } },
                    { $limit: 10 },
                    { $project: { _id: 0, x: { $year: "$_id" }, y: "$count" } },
                ],

                mensal: [
                    {
                    $group: {
                        _id: {
                        $dateFromParts: {
                            year: { $year: "$dataCadastro" },
                            month: { $month: "$dataCadastro" },
                        },
                        },
                        count: { $sum: 1 },
                    },
                    },
                    { $sort: { _id: -1 } },
                    { $limit: 12 },
                    {
                    $project: {
                        _id: 0,
                        x: {
                        $concat: [
                            { $toString: { $month: "$_id" } },
                            "-",
                            { $toString: { $dayOfMonth: "$_id" } },
                            "-",
                            { $toString: { $year: "$_id" } },
                            " GMT",
                        ],
                        },
                        y: "$count",
                    },
                    },
                ],

                diario: [
                    {
                    $group: {
                        _id: {
                        $dateFromParts: {
                            year: { $year: "$dataCadastro" },
                            month: { $month: "$dataCadastro" },
                            day: { $dayOfMonth: "$dataCadastro" },
                        },
                        },
                        count: { $sum: 1 },
                    },
                    },
                    { $sort: { _id: -1 } },
                    { $limit: 31 },
                    {
                    $project: {
                        _id: 0,
                        x: {
                        $concat: [
                            { $toString: { $month: "$_id" } },
                            "-",
                            { $toString: { $dayOfMonth: "$_id" } },
                            "-",
                            { $toString: { $year: "$_id" } },
                            " GMT",
                        ],
                        },
                        y: "$count",
                    },
                    },
                ],
                },
            },
            ],
        })
            return cursor.toArray();
    };

    Colaborador.remoteMethod("getNumCadastros", {
        description: "Retorna o número de cadastros agrupados por, dia, mês e ano",
        http: {
            path: "/num/cadastros",
            verb: "get",
        },
        returns: {
            type: [{}],
            root: true,
        },
    });

};
