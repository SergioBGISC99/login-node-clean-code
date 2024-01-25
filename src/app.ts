import { envs } from "./config";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(() => {
  main();
})();

async function main() {
  // todo: await de base de datos

  new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  }).start();
}
