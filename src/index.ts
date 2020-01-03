import initDefaultTheme, { registerTheme, changeTheme } from "./setup";

export * from "./modules/Button";
export * from "./modules/Typography";
export { initDefaultTheme, registerTheme, changeTheme };

if (module.hot) {
    module.hot.accept();
}