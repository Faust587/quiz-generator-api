export type serviceResultTypes<ErrorsType> = {
  ok: boolean,
  errors: ErrorsType[];
}
