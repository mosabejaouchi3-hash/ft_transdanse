const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("خطأ: يرجى تحديد رقم المنفذ (Port). مثال: node app.js 8080");
  process.exit(1);
}

const rawPort = args[0];
const port = parseInt(rawPort, 10);

if (isNaN(port) || port < 1 || port > 65535) {
  console.error(`خطأ: المنفذ "${rawPort}" غير صالح. يجب أن يكون رقماً بين 1 و 65535.`);
  process.exit(1);
}

const environment = args[1] || "development";

console.log(`تم التشغيل بنجاح!`);
console.log(`المنفذ: ${port}`);
console.log(`البيئة: ${environment}`);