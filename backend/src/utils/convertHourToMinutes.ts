//EXPORTANDO METODO QUE CONVERTE DATA EM MINUTOS
export default function convertHourToMinutes(time: string) {
  //USANDO DESTRUCTION PARA PEGAR O VALOR DA HORA E MINUTO EM UM  ARRAY
  const [hour, minutes] = time.split(':').map(Number);
  //SOMANDO
  const timeInMinutes = hour * 60 + minutes;
  //RETORANDO TOTAL
  return timeInMinutes;
}