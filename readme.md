## API para consumo de agua e gás

Essa aplicação guarda o consumo de agua de gás de um cliente para cada mês, à partir de uma foto do medidor.
A partir dessa foto, uma IA(Gemini) irá analisar a foto e retornar o valor que está medindo.

#### Como executar

```bash
# Clonar o repositório
git clone https://github.com/vinicius377/water-gas-consumption.git && cd water-gas-consumption.git

# Colocar sua chave de api do gemini nas variáveis de ambiente
echo "GEMINI_API_KEY=<YOUR_API_KEY>" >> .env

# Iniciar o projeto
docker compose up -d --build
```

Esse comando irá instalar todas as dependências do projeto, fazer o build da aplicação para *dist/main.js*, iniciar todos os serviços necessários, e executar a aplicação na porta `80`, ou seja *http://localhost:80*.

Os testes foram escritos com vitest e podem ser executados com o script `npm run test`.

#### Tecnologias

- Fastify

  **Motivo:** Simples e modular, bem customizável e pouco opinado

- Mongodb

  **Motivo:** Rápido de utilizar e alterar, ótimo para o caso

- Minio

  **Motivo**: Compatível com o AWS S3, ótimo para desenvolvimento pois é como executar um S3 localmente

#### Endpoints

- **POST /upload**

  Criar um novo registro de consumo

  ```json
  // Payload
  {
      "image": "base64",
      "customer_code": "string",
      "measure_datetime": "datetime",
      "measure_type": "WATER ou GAS"
  }
  
  // Resposta de sucesso
  {
      “image_url”: "string",
      “measure_value”:"integer",
      “measure_uuid”: "string"
  }
  ```

- **PATCH /confirm**

  Confirmar o valor

  ```json
  // Payload
  {
      "measure_uuid": "string",
      "confirmed_value": "integer"
  }
  
  // Resposta de sucesso
  {
      “success”: true
  }
  ```

- **GET /<customer code>/list (params: measure_type=WATER)**

  ```json
  // Resposta de sucesso
  {
  	“customer_code”: string,
      “measures”: [
          {
          “measure_uuid”: string,
          “measure_datetime”: datetime,
          “measure_type”: string,
          “has_confirmed”:boolean,
          “image_url”: string
          },
      ]
  }
  ```

  

