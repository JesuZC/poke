export class LoadUno{
  constructor(
    public _id: number,
    public name: string,
    public types: any[],
    public weight: number,
    public height: number,
    public base_experience: number,
    public abilities: any[],
    public moves: any[],
    public sprites: any,
    public ischarged: boolean
  ){}
}
