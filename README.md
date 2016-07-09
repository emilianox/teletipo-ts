# Teletipo

![Image](https://cdn.rawgit.com/emilianox/Teletipo/master/images/teletipo.min.svg?raw=true)

A microframework between google app script(GAS) and telegram API for simple telegram Bots (Typescript Version)

**Glosary** gas = google app script

# Install

**One time for all bots**

- configure [typescript](https://www.typescriptlang.org/docs/tutorial.html)
- configure [node-google-apps-script](https://github.com/danthareja/node-google-apps-script)

**First time when create each bot**

- clone this repo
- create in <https://script.google.com> your project
- create bot in [https://web.telegram.org/#/im?p=@BotFather](mailto:https://web.telegram.org/#/im?p=@BotFather)
- paste **_project_name_**,**_id_gapps_**, **_secret_** in _config.ts

```typescript
  googleAppScript:
    project_name : ""
    id_gapps : ""
  secret:""
```

_project_name_ : the name of the the project in de _gas_ editor

_id_gapps_: from "<https://script.google.com/d/**ID_GAPPS> IS HERE**/edit?splash=yes"

_secret_: in [BotFather](ttps://web.telegram.org/#/im?p=@BotFather) the token to access :

> Ex. **22465655206:ZYGPndgYE5Ejs8e6_9pujKywTgHKDvGu-Cp**

- run (into proyect folder) `node pull.js`
- edit frontend/commands.ts
- edit test/frontend.ts
- run (into proyect folder) `node push.js`
- go to Publish > Deploy as web app. [Guide](https://developers.google.com/apps-script/guides/web#deploying_a_script_as_a_web_app)

  > - Execute the app as **your username**
  > - Who has access to the app "Anyone, even anonymous"
  > - Click Deploy.
  > - Will show a url (the url should look like this <https://script.google.com/macros/s/*****/exec>)

- in gas editor run `setTelegram` function in init file

- profit!

**When edit**

- run (into proyect folder) `node push.ts`
- edit frontend/commands.ts
- edit test/frontend.ts
- run (into proyect folder) `node push.ts`
- go to Publish > Deploy as web app. [Guide](https://developers.google.com/apps-script/guides/web#deploying_a_script_as_a_web_app)

  > - Execute the app as **your username**
  > - Who has access to the app "Anyone, even anonymous"
  > - Click Deploy.
  > - Will show a url (the url should look like this <https://script.google.com/macros/s/*****/exec>)

- in the gas editor run `setTelegram` (init.gs) function in init file

- profit!
