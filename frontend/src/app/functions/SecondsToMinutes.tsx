export default function SecondsToMinutes(seconds: number) {
    let minutes = Math.floor(seconds / 60);
    let extraSeconds = seconds % 60;
    minutes = minutes < 10 ? 0 + minutes : minutes;
    extraSeconds = extraSeconds < 10 ? 0 + extraSeconds : extraSeconds;
    return `${minutes} minuten en ${extraSeconds} seconden`
}