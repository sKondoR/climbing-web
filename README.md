# SpbClimbKids

Сайт для сравнения пролазов скалолазов с популярного скалолазного гайдбука [Allclimb](https://i-climbed.vercel.app/)<br />
🌐 [https://spbclimbkids.vercel.app/allclimb](https://spbclimbkids.vercel.app/allclimb)<br />
🌐 [пример сгенеренной ссылки с заполненными скалолазами](https://spbclimbkids.vercel.app/allclimb?q=NobwRAdghgtgpmAXGQXCCD4QQPCCAYQQvCCBYQLMAGjAEsAXOGAZyVDCgBtGBhR0mAIwEkATJAEwAWAIwB2ABwkAxgFdq5APYwAcrATJAhCBZAEiBYABIBwQNCkACIIGEQPWAC+RcE1bsufJAGYArAICcAmfKWq6khgNnYMzGwcPPyIQgBsXl5CfgrKavDBofYRTtFIQmJeIq4pAekaYIDIIIDcIICsIICMIPqAqCCmtRiAHCA4WeGOUS6I7gAMcQKDpWlBWoBCIFiAgiCA8iD6gOgggNIgpvM4aIBMIIS22b3OMe4FrnHjgRnI3Q6Rh0jHEq5e5+WZez23eQPuEiMvk2BAAggpk6BkMWEAbCBYUy7MI3XL9OLxMS+MByVIXCo2AC672glzAeAsgHYQQAyIPNiGRKDQ6PtPv0BI84mM0f4JgTrjk+jFXINBl4SqyMa9kIAKEHMdS2nIOX1cxTEYn+HPe8O5bgV7hESoqgGwQQByIPUDIBEEHaIOq21hdIRMSEPmE2uC2j0Rnaei6Kq5d0QSJEPwdVw9MsRxyG-pC1lxYXxFUA-CCmNCUihUWiIeiqr1xIZSIVlAGALBB2nH2hsLdL6TEREIhBJs+jcwTDO0pp0y9akOIxLyw4ASECwKFNJalgfLgjicsFdfZFSWWHa-Zwlo+bcQcr5WpzU+CM8AnCDoHattUr34SZ4bzHBQC4IHOm6D9IA6EGqFOHy9cJ8G68n5+QeawU0WeZhDA0HjfcIwjIA)<br />
🔗 Бэкенд: [github.com/sKondoR/climbing-back](github.com/sKondoR/climbing-back)<br />


## Функциональность

### Вход в систему
Пользователь может:<br />
- Войти через VK Auth — тогда данные сохраняются на сервере.<br />
- Работать оффлайн — все данные хранятся локально (в localStorage).<br />

### Управление группами скалолазов
- Создание, редактирование, сортировка и удаление групп.<br />
- Добавление участников по их allclimbId (например, 47913).<br />
- Новые скалолазы помечаются как «новый» до загрузки данных с Allclimb.<br />
- Данные скалолазов подтягиваются при нажатии кнопки «Загрузка только новых».<br />

### Сравнение пролазов
- Выбор скалолазов для сравнения.<br />
- Фильтрация трасс по: категории cложности, типу (боулдеринг/трудность).<br />
- Визуализация результатов с помощью графиков (Recharts).<br />

### Обмен ссылками
- Генерация уникальной ссылки с текущей конфигурацией (группы + скалолазы).<br />
Пример: [ссылка](https://spbclimbkids.vercel.app/allclimb?q=NobwRAdghgtgpmAXGQXCCD4QQPCCAYQQvCCBYQLMAGjAEsAXOGAZyVDCgBtGBhR0mAIwEkATJAEwAWAIwB2ABwkAxgFdq5APYwAcrATJAhCBZAEiBYABIBwQNCkACIIGEQPWAC+RcE1bsufJAGYArAICcAmfKWq6khgNnYMzGwcPPyIQgBsXl5CfgrKavDBofYRTtFIQmJeIq4pAekaYIDIIIDcIICsIICMIPqAqCCmtRiAHCA4WeGOUS6I7gAMcQKDpWlBWoBCIFiAgiCA8iD6gOgggNIgpvM4aIBMIIS22b3OMe4FrnHjgRnI3Q6Rh0jHEq5e5+WZez23eQPuEiMvk2BAAggpk6BkMWEAbCBYUy7MI3XL9OLxMS+MByVIXCo2AC672glzAeAsgHYQQAyIPNiGRKDQ6PtPv0BI84mM0f4JgTrjk+jFXINBl4SqyMa9kIAKEHMdS2nIOX1cxTEYn+HPe8O5bgV7hESoqgGwQQByIPUDIBEEHaIOq21hdIRMSEPmE2uC2j0Rnaei6Kq5d0QSJEPwdVw9MsRxyG-pC1lxYXxFUA-CCmNCUihUWiIeiqr1xIZSIVlAGALBB2nH2hsLdL6TEREIhBJs+jcwTDO0pp0y9akOIxLyw4ASECwKFNJalgfLgjicsFdfZFSWWHa-Zwlo+bcQcr5WpzU+CM8AnCDoHattUr34SZ4bzHBQC4IHOm6D9IA6EGqFOHy9cJ8G68n5+QeawU0WeZhDA0HjfcIwjIA)<br />


## Технологический стек

🖥️ Фронтенд - React, Vite, Tailwind CSS, Recharts<br />
⚙️ [Бэкенд](https://github.com/sKondoR/climbing-back) - NestJS, TypeORM

