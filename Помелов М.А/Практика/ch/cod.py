import pandas as pd
from datetime import datetime, timedelta

# Данные операторов и их скорости обработки тикетов
operators = {
    "Серсея": 7, "Джейми": 6, "Тайвин": 8, "Джоффри": 4,
    "Тирион": 11, "Томмен": 5, "Нэд": 5, "Кейтилин": 7,
    "Робб": 8, "Бран": 10, "Санса": 6, "Арья": 9, "Джон": 6
}

# Даты и смены
start_date = datetime(2024, 7, 1)
end_date = datetime(2024, 7, 31)
shift_hours = [("06:00", "18:00"), ("12:00", "24:00")]

# Создание списка смен
schedule = []
current_date = start_date
while current_date <= end_date:
    for operator in operators:
        for shift in shift_hours:
            schedule.append([current_date.strftime("%d.%m.%Y"), operator, f"{shift[0]}-{shift[1]}", f"{shift[0]}-{shift[1]}"])
    current_date += timedelta(days=1)

# Создание DataFrame и сохранение в Excel
df = pd.DataFrame(schedule, columns=["Дата", "Оператор", "Смена", "Часы работы"])
df.to_excel("schedule_july_2024.xlsx", index=False)