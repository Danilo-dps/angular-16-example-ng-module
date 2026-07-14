# Meu Projeto 16

## Node e versões

- `node --version` verifica qual versão do Node está instalada.
- Uso o NVM para alternar entre versões do Node conforme a necessidade do projeto.

## Angular CLI via npx

- Para rodar o projeto Angular e usar a CLI sem instalá-la globalmente, uso `npx` antes dos comandos.
- `npx` é um recurso que vem embutido no npm (e portanto no Node). Ele permite executar um pacote sem precisar tê-lo instalado de forma permanente.
- **Ao rodar**  `npx @angular/cli@16 new nome-do-projeto` em um diretório vazio, o `npx` baixa a CLI **temporariamente** (fica em um cache do npx, não vira dependência do projeto ainda). O que salva a Angular CLI como dependência do projeto é o próprio `ng new`, que já configura o `@angular/cli` como `devDependency` no `package.json` gerado. Ou seja: o primeiro uso é temporário; a partir daí, dentro da pasta do projeto, a CLI já existe localmente em `node_modules` e o `npx` passa a usar essa versão local em vez de baixar de novo.
- `npx @angular/cli@16 new nome-do-projeto` — especificando `@16`, é criado o projeto já usando a versão 16 do Angular.

## NgModule

- Em projetos Angular 16 (ou versões anteriores) é comum utilizar `NgModule`, que é o arquivo responsável por agregar e organizar as peças do projeto para que ele funcione.
- É obrigatório existir **pelo menos um módulo** (o `AppModule`) — sem ele, o projeto não sobe.
- De forma geral, o `NgModule` exige configuração mais explícita: é preciso declarar, importar e exportar manualmente dentro do módulo para que diferentes partes do projeto (componentes, diretivas, pipes) consigam se comunicar e ser usadas em outros templates (HTML).

### As propriedades do decorator `@NgModule`

- **`declarations`**: registra os componentes, diretivas e pipes que **pertencem** àquele módulo. Cada componente/diretiva/pipe só pode ser declarado em **um único** módulo.
- **`imports`**: permite usar dentro deste módulo componentes, diretivas, pipes ou até outros módulos inteiros (ex.: `CommonModule`, `FormsModule`, ou um `ComponentsModule`) que foram exportados por outro módulo.
- **`exports`**: sinaliza que os componentes/diretivas/pipes declarados neste módulo podem ser usados por quem importar este módulo. É o que garante que outra parte do projeto consiga "enxergar" e usar o que foi declarado aqui.
- **`providers`** *(complemento — não estava nas suas anotações)*: lista os serviços que devem ser disponibilizados para injeção de dependência no escopo deste módulo. Hoje em dia, com `providedIn: 'root'` nos serviços, essa propriedade é usada com menos frequência, mas ainda aparece em módulos de funcionalidade específica.
- **`bootstrap`** *(complemento)*: existe **apenas no `AppModule`** e indica qual componente será inicializado primeiro quando a aplicação carrega (normalmente `AppComponent`). Nenhum outro módulo tem essa propriedade.

### Por que o `AppModule` não tem `exports`?

A resposta é sobre **quem consome quem**:

- `exports` serve para que **outros módulos que importam o seu** possam usar o que foi declarado.
- O `AppModule` é o módulo **raiz**. Ele não é importado por ninguém — pelo contrário, é ele quem importa os outros módulos (como o seu `ComponentsModule`). Como nada precisa "pegar emprestado" algo do `AppModule`, não há necessidade de exportar nada dele.
- Já módulos de funcionalidade, como `ComponentsModule`, existem justamente para serem consumidos por outros módulos (geralmente pelo `AppModule` ou por outro módulo de features). Por isso eles **precisam** declarar `exports`: sem isso, mesmo importando o `ComponentsModule`, o `AppModule` não conseguiria usar `comps-one` ou `comps-two` no seu HTML.

Resumindo: `exports` é uma propriedade de quem **fornece**, não de quem **consome**. O `AppModule` é consumidor final da árvore de módulos, então normalmente não precisa exportar nada (a menos que tenha outro módulo raiz importando-o, o que é incomum).

## `npm run ng generate` vs `npx ng generate`

As duas fazem essencialmente a mesma coisa, mudando apenas o caminho até o binário local da CLI:

- Quando se roda `ng new`, o `package.json` gerado já vem com um script chamado `"ng": "ng"` dentro de `"scripts"`. Isso significa que o próprio projeto já sabe apontar para a versão do Angular CLI instalada em `node_modules/.bin`.
- `npm run ng generate component components/comps-one` aproveita esse script `ng` já configurado no `package.json` — o `npm run` sabe procurar binários dentro de `node_modules/.bin` automaticamente.
  - **Atenção:** para passar argumentos extras através do `npm run`, o mais correto/seguro é usar `--` antes dos argumentos: `npm run ng -- generate component components/comps-one`. Sem o `--`, dependendo da versão do npm, os argumentos podem não ser repassados corretamente para o comando `ng`. Muitos tutoriais omitem o `--` e funciona mesmo assim em versões mais recentes do npm, mas vale ter isso em mente se algo não funcionar como esperado.
- `npx ng generate component components/comps-one` faz a mesma coisa, mas via `npx`, que resolve o binário local do Angular CLI diretamente, sem depender de um script definido no `package.json`.
- Também é possível instalar o Angular CLI **globalmente** (`npm install -g @angular/cli`) e rodar só `ng generate ...` sem `npx` nem `npm run`. Essa é a terceira alternativa, mas foge do objetivo de manter tudo escopado por projeto para evitar conflito de versões entre projetos diferentes.

## Modularização: NgModule vs Standalone

- Em um projeto modularizado com `NgModule`, **é obrigatório** que todo componente, diretiva ou pipe esteja declarado em algum módulo para funcionar — sem isso, o Angular não consegue compilá-lo nem usá-lo em nenhum template.
- Essa obrigatoriedade deixa de existir apenas com **componentes standalone** *(complemento)*: introduzidos como developer preview no Angular 14 e estabilizados no Angular 15, os componentes standalone (`standalone: true`) dispensam a necessidade de um `NgModule` — eles importam diretamente o que precisam (via `imports` no próprio `@Component`), sem depender de declarations de um módulo. No Angular 16, a CLI ainda gera projetos baseados em `NgModule` por padrão, a menos que se use a flag `--standalone` ao criar componentes ou o próprio projeto.
- Resumo da diferença: **módulos são importados** (via `imports`), enquanto **componentes, diretivas e pipes são declarados** (via `declarations`) — essa distinção é fundamental.
- No seu exemplo: `ComponentsModule` é o módulo ao qual os componentes `comps-one` e `comps-two` estão vinculados — ou seja, eles foram declarados dentro dele e (presumivelmente) exportados, para que o `AppModule`, ao importar o `ComponentsModule`, consiga utilizá-los em seus templates.
