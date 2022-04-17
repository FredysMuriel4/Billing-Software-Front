import TokenValidate from './../utils/TokenValidate'
export default (fn,component) => {
  TokenValidate(component).then((b) => {
    console.log(b)
  })

  Promise
    .resolve(fn(component))
    .catch((e) => {
      console.log(e);
      component.error = 'Internal server error';
      component.loading = false;
      component.processing = false;
    });
}
