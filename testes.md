a -> b
b -> c

Mocks: Guardar objeto a para poder testar b -> c

Outro exemplo: Converter um CSV em JSON
1 - Validar conteúdo
2 - Validar vazio

- A melhor forma de testar isso é mockando um conteúdo, um inválido, um válido... etc

# spies -> observam as funções validando as quantidades de vezes que elas foram chamadas, quais parâmetros e quais resultados.
