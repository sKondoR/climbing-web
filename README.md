# SpbClimbKids

Сайт для сравнения пролазов скалолазов с популярного скалолазного гайдбука [Allclimb](https://i-climbed.vercel.app/)
🌐 [https://spbclimbkids.vercel.app/allclimb](https://spbclimbkids.vercel.app/allclimb)


## Функциональность

- пользователь может залогиниться с использованием VK Auth или же работать локально
- пользователь редактировать свои группы, изменения сохраняются локально при выходе из экрана редактирования или при клике на кнопку "сохранить" если пользователь залогинен через VK
- в группу можно добавить скалолаза по allclimbId (например "47913"). Если данные скалолаза еще не скачивались с Allclimb, он подсвечивается (например "47913\новый"). Данные скалолаза будут доступны после загрузки с Allclimb о клику на кнопку "только новых"
- можно выбирать скалолазов и настраивать фильтры трасс
- пользователь может поледиться ссылкой (клик на кнопку "поделиться") на настроенные группы со скалолазами (например [ссылка](https://spbclimbkids.vercel.app/allclimb?q=NobwRAdghgtgpmAXGQXCCD4QQPCCAYQQvCCBYQLMAGjAEsAXOGAZyVDCgBtGBhR0mAIwEkATJAEwAWAIwB2ABwkAxgFdq5APYwAcrATJAhCBZAEiBYABIBwQNCkACIIGEQPWAC+RcE1bsufJAGYArAICcAmfKWq6khgNnYMzGwcPPyIQgBsXl5CfgrKavDBofYRTtFIQmJeIq4pAekaYIDIIIDcIICsIICMIPqAqCCmtRiAHCA4WeGOUS6I7gAMcQKDpWlBWoBCIFiAgiCA8iD6gOgggNIgpvM4aIBMIIS22b3OMe4FrnHjgRnI3Q6Rh0jHEq5e5+WZez23eQPuEiMvk2BAAggpk6BkMWEAbCBYUy7MI3XL9OLxMS+MByVIXCo2AC672glzAeAsgHYQQAyIPNiGRKDQ6PtPv0BI84mM0f4JgTrjk+jFXINBl4SqyMa9kIAKEHMdS2nIOX1cxTEYn+HPe8O5bgV7hESoqgGwQQByIPUDIBEEHaIOq21hdIRMSEPmE2uC2j0Rnaei6Kq5d0QSJEPwdVw9MsRxyG-pC1lxYXxFUA-CCmNCUihUWiIeiqr1xIZSIVlAGALBB2nH2hsLdL6TEREIhBJs+jcwTDO0pp0y9akOIxLyw4ASECwKFNJalgfLgjicsFdfZFSWWHa-Zwlo+bcQcr5WpzU+CM8AnCDoHattUr34SZ4bzHBQC4IHOm6D9IA6EGqFOHy9cJ8G68n5+QeawU0WeZhDA0HjfcIwjIA))

## Стэк

фронт - Vite, React, Tailwindcss, Recharts<br />
[бэк](https://github.com/sKondoR/climbing-back) - Nestjs, Typeorm

