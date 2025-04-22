#!/bin/bash

folder_name="ENGWEB2025-Normal"
# Baseado na estrutura da aferição
# Criar pastas, assumindo 2 exercícios
git clone git@github.com:gabrielRibeir0/ENGWEB2025-Normal.git

# Criar ficheiros na base
cp PR.md $folder_name

# Ficheiro python para corrigir o dataset com abrir e fechar o ficheiro
echo -e "import json\nimport re" > ./$folder_name/fix_dataset.py
echo -e "\nwith open(\"dataset.json\", \"r\", encoding=\"utf-8\") as f:\n    data = json.load(f)\n" >> ./$folder_name/fix_dataset.py
echo -e "\nwith open(\"dataset.json\", \"w\", encoding=\"utf-8\") as f:\n    json.dump(data, f, ensure_ascii=False, indent=4)" >> ./$folder_name/fix_dataset.py

cd $folder_name

# Iniciar aplicação da api
npx express-generator --view=pug ex1

cd ex1

# Queries.txt, formatado para 5 queries
echo -e "1.\n\n2.\n\n3.\n\n4.\n\n5." > queries.txt

npm i mongoose --save --silent
npm install --silent

mkdir models controllers
rm ./routes/users.js

# Alterar porta da api para 17000
sed -i "/normalizePort/s/'3000'/'25000'/" "./bin/www"

# Link na consola
sed -i '/function onListening() {/,/}/c\
function onListening() {\
  console.log("Server running on port http://localhost:" + port + "/");\
}' "./bin/www"

# Remover linhas desnecessárias no app.js
sed -i '/var usersRouter = require/d' "./app.js"
sed -i '/app.use('\''\/users'\''\, usersRouter);/d' "./app.js"


# EX 2 (assumindo que é a interface)
cd ..
npx express-generator --view=pug ex2

cd ex2

npm i axios --save --silent
npm install --silent

# Ir buscar w3.css
wget -nv -O ./public/stylesheets/style.css https://www.w3schools.com/w3css/5/w3.css
rm ./routes/users.js

# Trocar a porta da interface para 17001
sed -i "/normalizePort/s/'3000'/'25001'/" "./bin/www"

# Link na consola
sed -i '/function onListening() {/,/}/c\
function onListening() {\
  console.log("Server running on port http://localhost:" + port + "/");\
}' "./bin/www"

# Remover linhas desnecessárias no app.js
sed -i '/var usersRouter = require/d' "./app.js"
sed -i '/app.use('\''\/users'\''\, usersRouter);/d' "./app.js"

# Iniciar container mongo
docker start mongoEW
