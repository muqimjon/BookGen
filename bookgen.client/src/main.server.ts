import { provideHttpClient, withFetch } from "@angular/common/http";
import { bootstrapApplication } from "@angular/platform-browser";
import { provideServerRendering } from "@angular/platform-server";
import { provideRouter } from "@angular/router";
import { AppComponent } from "./app/app.component";
import { routes } from "./app/app.routes";

const bootstrap = () => bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideServerRendering()
  ]
});

export default bootstrap;
