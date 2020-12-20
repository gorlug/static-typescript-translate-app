# StaticTypescriptTranslate

This lib is a TranslateLoader for the [@ngx-translate/core](https://github.com/ngx-translate/core) lib. It loads the 
translations from a class inside a TypeScript file. This will allow you to have code completion of the translate 
keys inside your keys if set up like this:

## Setup

Create a ts file for each language like this, e.g. in `src/app/i18n/ENClass.ts`:

```typescript
export class ENClass {
  'hello' = 'hello world'
  someKey = {
    subKey: 'value',
    evenLower: {
      lowerKey: 'lower key'
    }
  }
}
```

In `app.module.ts` load the lib with a JSON object where the key is the name of the language and the value points to 
an instance of the class with the translate keys:

```typescript
StaticTypescriptTranslateModule.forRoot({
  en: new ENClass(), de: new DEClass()
})
```

Create one loader function

```typescript
export function createTranslateLoader(translateService: StaticTypescriptTranslateService) {
  return translateService
}
```

Then initialize @ngx-translate/core like this:

```typescript
TranslateModule.forRoot({
  loader: {
    provide: TranslateLoader,
    useFactory: createTranslateLoader,
    deps: [StaticTypescriptTranslateService]
  },
  parser: {provide: TranslateParser, useValue: new TranslateDefaultParser()},
  defaultLanguage: 'en'
})
```

## Auto complete of keys

For the auto complete part of the lib, create an InjectToken

```typescript
export const TRANSLATE_KEYS = new InjectionToken<ENClass>('TRANSLATE_KEYS')
```

and add it to the providers in your `app.module.ts`:

```typescript
providers: [
  {
    provide: TRANSLATE_KEYS,
    useValue: generatePathMap(new ENClass())
  }
]
```

## Setup inside a lib

You should add a prefix to keys of your i18n class:

```typescript
export class ENClass {
  translateExample = {
    libText: 'some lib text'
  }
}
```

In the module init you specify that prefix key:

```typescript
StaticTypescriptTranslateModule.forChild({
  prefix: 'translateExample', langs: {
    en: new ENClass(), de: new DEClass()
  }
})
```

# Default readme

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4.

## Code scaffolding

Run `ng generate component component-name --project static-typescript-translate` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project static-typescript-translate`.
> Note: Don't forget to add `--project static-typescript-translate` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build static-typescript-translate` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build static-typescript-translate`, go to the dist folder `cd dist/static-typescript-translate` and run `npm publish`.

## Running unit tests

Run `ng test static-typescript-translate` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
