import { DiscountPipe } from './discount-pipe';

describe('DiscountPipe', () => {
  let pipe: DiscountPipe;

  beforeEach(() => {
    pipe = new DiscountPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('deve aplicar o desconto percentual corretamente sobre o valor informado', () => {
    // 100 com 15% de desconto deve retornar 85
    const resultado = pipe.transform(100, 15);
    expect(resultado).toBe(85);
  });

  it('deve calcular corretamente descontos com casas decimais', () => {
    // 200 com 10% de desconto deve retornar 180
    const resultado = pipe.transform(200, 10);
    expect(resultado).toBe(180);
  });

  it('deve retornar 0 quando o valor for null, undefined ou invalido', () => {
    expect(pipe.transform(null, 15)).toBe(0);
    expect(pipe.transform(undefined, 15)).toBe(0);
    expect(pipe.transform(NaN, 15)).toBe(0);
  });
});