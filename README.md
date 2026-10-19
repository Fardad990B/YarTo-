# یار تو (YarTo)

«یار تو» یک دستیار ساده و فارسی برای مدیریت زندگی روزمره است. این مخزن اکنون فاز ۰ را دارد: اسکلت Nuxt، رابط RTL، ثبت‌نام و ورود امن، اتصال واقعی MongoDB، داشبورد اولیه، PWA و صفحه حمایت از سازنده.

## پیش‌نیاز

- Node.js نسخه ۲۲ یا ۲۴ (این پروژه با Nuxt 4 ساخته شده است)
- npm
- MongoDB محلی ۸ یا جدیدتر، یا Docker برای اجرای آن

## راه‌اندازی

```bash
cp .env.example .env
# مقدار NUXT_SESSION_PASSWORD را با یک رشته تصادفی حداقل ۳۲ کاراکتری عوض کنید
docker compose up -d mongodb
npm install
npm run dev
```

سپس [http://localhost:3000](http://localhost:3000) را باز کنید. اگر MongoDB را جداگانه نصب کرده‌اید، فقط مطمئن شوید روی پورت ۲۷۰۱۷ در حال اجراست.

## متغیرهای محیطی

`MONGODB_URI` رشته اتصال MongoDB است، `MONGODB_DB` نام پایگاه داده و `NUXT_SESSION_PASSWORD` کلید رمزنگاری نشست HttpOnly است. فایل `.env` هرگز نباید وارد Git شود.

## فرمان‌ها

```bash
npm run dev       # توسعه
npm run typecheck # بررسی TypeScript
npm test          # تست‌های اعتبارسنجی
npm run build     # ساخت production
npm run preview   # اجرای ساخت production
```

## خطاهای رایج

- `ECONNREFUSED 127.0.0.1:27017`: MongoDB را با `docker compose up -d mongodb` اجرا کنید.
- خطای نشست یا کلید کوتاه: مقدار `NUXT_SESSION_PASSWORD` را به حداقل ۳۲ کاراکتر افزایش دهید و dev server را دوباره اجرا کنید.
- خطای نصب npm: نسخه Node را بررسی کنید و سپس `rm -rf node_modules package-lock.json && npm install` را اجرا کنید.

## وضعیت امنیتی

رمز عبور با Argon2id ذخیره می‌شود و نشست با کوکی HttpOnly مدیریت می‌شود. API داشبورد احراز هویت را بررسی می‌کند. در انتشار عمومی باید HTTPS، محدودیت تلاش ورود، CSRF کامل و پشتیبان‌گیری عملیاتی تکمیل و بازبینی شوند.
