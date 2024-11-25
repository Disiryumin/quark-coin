from telegram import Update, KeyboardButton, ReplyKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler

# Ваш токен
BOT_TOKEN = "7911702630:AAH0TTRQYLec6U_eQ5sv78oYcGTmwevjOVg"

# Создаём команду /start
async def start(update: Update, context):
    # Кнопка с Web App
    keyboard = [
        [KeyboardButton("🖱 Открыть кликер", web_app={"url": "https://disiryumin.github.io/quark-coin/"})]
    ]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)

    # Приветственное сообщение
    await update.message.reply_text(
        text="Добро пожаловать в нашего бота! Нажмите кнопку ниже, чтобы открыть кликер.",
        reply_markup=reply_markup
    )

# Настройка бота
app = ApplicationBuilder().token(BOT_TOKEN).build()

# Добавляем обработчик команды /start
app.add_handler(CommandHandler("start", start))

# Печатаем сообщение, что бот запущен
print("Бот запущен и готов к работе.")

# Запускаем бота
app.run_polling()