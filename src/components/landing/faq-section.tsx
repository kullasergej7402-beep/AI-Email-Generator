import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Это бесплатно?",
    answer:
      "Да, базовый план бесплатный. Ты получаешь определённое количество генераций в месяц без кредитной карты. Если нужно больше — есть платные тарифы.",
  },
  {
    question: "Какие языки поддерживаются?",
    answer:
      "Сервис поддерживает русский и английский языки. AI понимает тему на любом из них и генерирует письмо на том же языке.",
  },
  {
    question: "Насколько уникальны письма?",
    answer:
      "Каждое письмо генерируется с нуля на основе твоего запроса. AI не использует шаблоны — текст всегда уникален и адаптирован под твою тему.",
  },
  {
    question: "Можно ли редактировать результат?",
    answer:
      "Да. Полученное письмо можно скопировать и отредактировать в любом редакторе. В будущем мы добавим встроенный редактор прямо в сервисе.",
  },
  {
    question: "Мои данные в безопасности?",
    answer:
      "Мы не передаём содержимое твоих писем третьим лицам и не используем их для обучения моделей. История хранится в твоём личном кабинете и доступна только тебе.",
  },
  {
    question: "Что если письмо не понравилось?",
    answer:
      "Просто сгенерируй ещё раз — каждый запрос даёт новый результат. Можно также уточнить тему или изменить тон, чтобы получить более подходящий вариант.",
  },
];

export function FaqSection() {
  return (
    <section className="border-t bg-muted/30 py-20 md:py-28">
      <div className="container max-w-screen-xl px-4">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            FAQ
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Часто задаваемые вопросы
          </h2>
        </div>

        <Accordion
          type="single"
          collapsible
          className="mx-auto w-full max-w-2xl"
        >
          {faqs.map(({ question, answer }, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
