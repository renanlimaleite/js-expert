- Testes em geral você testa do ponto A -> B (A para o ponto B)
- E se quisermos testar o "C", A -> B -> C, teriamos que testar A e B novamente?
- Então ai que os mocks entram, o resultado gerado por A é mockado (que é o output B) e podemos - testar o ponto C com o mock de B, sem mais a necessidade do ponto A.

## Mundo real:

- Converter o conteúdo de um arquivo CSV em JSON.
- Regra: Validar conteúdo, vazio, propriedades desejadas, para cada regra é um mock diferente para testarmos bem desacoplado de outros pontos/outputs...!

## Mocks

- Validação de cadastro
  - senha diferentes
  - senha maior que 6 menor que 10
  - senha vazia
  - user repetido
