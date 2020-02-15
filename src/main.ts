import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { hmrBootstrap } from './hmr';

if (environment.production) {
  enableProdMode();
}

export const bootstrap = () => platformBrowserDynamic().bootstrapModule(AppModule);

declare var module: any;

if (module['hot']) {
  hmrBootstrap(module, bootstrap);
} else {
  bootstrap();
}