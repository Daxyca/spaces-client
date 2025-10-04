export default function protectedLoader(loader) {
  return async (args) => {
    if (!localStorage.getItem("login")) {
      return;
    }
    return loader(args);
  };
}
