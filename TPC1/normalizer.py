import json

data = json.load(open('dataset_reparacoes.json', 'r', encoding='utf-8'))

reparacoes = data['reparacoes']
viaturas = []
intervencoes = []
codigos_intervencoes = set()
for reparacao in reparacoes:
    temp_intervencoes = reparacao['intervencoes']
    viaturas.append(reparacao['viatura'])
    reparacao['viatura'] = reparacao['viatura']['matricula']
    reparacao['intervencoes'] = []
    for intervencao in temp_intervencoes:
        reparacao['intervencoes'].append(intervencao['codigo'])
        if intervencao['codigo'] not in codigos_intervencoes:
            codigos_intervencoes.add(intervencao['codigo'])
            intervencoes.append(intervencao)

normalized_data = {
    'reparacoes': reparacoes,
    'viaturas': viaturas,
    'intervencoes': intervencoes
}

json.dump(normalized_data, open('reparacoes_normalized.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=4)