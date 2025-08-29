// Obtém o elemento HTML com o ID "counter"
const counterElement = document.getElementById('counter');

// Define a data de início para o contador
// Formato: ano, mês (0-11), dia, hora, minuto, segundo
// O mês 6 representa julho (0=janeiro, 1=fevereiro, ..., 6=julho)
const startDate = new Date(2024, 6, 12, 0, 0, 0); 

// Função que atualiza o contador
function updateCounter() {
    // Obtém a data e hora atuais
    const now = new Date();
    
    // Se a data de início for no futuro, o contador mostra 00:00:00
    if (now < startDate) {
        counterElement.textContent = "00 Anos, 00 Meses, 00 Dias | 00:00:00";
        return;
    }

    // Calcula a diferença em milissegundos
    const differenceInMilliseconds = now.getTime() - startDate.getTime();

    // Calcula os segundos, minutos e horas restantes
    const totalSeconds = Math.floor(differenceInMilliseconds / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600) % 24;
    
    // Calcula os anos, meses e dias a partir das datas
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    
    // Ajusta os valores se forem negativos
    if (days < 0) {
        months--;
        // Pega o número de dias do mês anterior
        const daysInPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
        days += daysInPreviousMonth;
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    // Função para formatar o número, adicionando um zero à esquerda se for menor que 10
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    // Formata o tempo para exibir no formato completo
    const formattedYears = formatTime(years);
    const formattedMonths = formatTime(months);
    const formattedDays = formatTime(days);
    const formattedHours = formatTime(hours);
    const formattedMinutes = formatTime(minutes);
    const formattedSeconds = formatTime(seconds);

    // Atualiza o conteúdo do elemento na tela
    counterElement.textContent = `${formattedYears} Anos, ${formattedMonths} Meses, ${formattedDays} Dias | ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Inicia o contador chamando a função `updateCounter` a cada 1000 milissegundos (1 segundo)
setInterval(updateCounter, 1000);

// Chama a função uma vez imediatamente para evitar o atraso inicial de 1 segundo
updateCounter();