export type PathItemProps = {
  to: string;
  name: string;
  inMenu?: boolean | undefined;
};

export interface iPaths {
    [key: string] : PathItemProps
}
