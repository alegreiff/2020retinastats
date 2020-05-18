export interface IEvento {
  title: string;
  color: Array<IColor>;
  start: Date;

}

interface IColor {
  primary: string,
  secondary: string
}
