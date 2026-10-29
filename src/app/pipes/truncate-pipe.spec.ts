import { TruncatePipe } from './truncate-pipe';

describe('TruncatePipe', () => {
  let pipe: TruncatePipe;

  beforeEach(() => {
    pipe = new TruncatePipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('deve retornar a string original se ela for menor ou igual ao limite', () => {
    const texto = 'Angular 19';
    const resultado = pipe.transform(texto, 20);
    expect(resultado).toBe('Angular 19');
  });

  it('deve truncar a string e adicionar reticências quando ultrapassar o limite', () => {
    const texto = 'Desenvolvimento Web Profissional com Angular';
    const resultado = pipe.transform(texto, 15);
    expect(resultado).toBe('Desenvolvimento...');
  });

  it('deve utilizar o limite padrão de 30 caracteres quando nenhum limite for informado', () => {
    const texto = 'Esta é uma frase bem longa que ultrapassa trinta caracteres com certeza.';
    const resultado = pipe.transform(texto);
    expect(resultado).toBe('Esta é uma frase bem longa que...');
  });

  it('deve retornar uma string vazia se o valor for null ou undefined', () => {
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
  });
});