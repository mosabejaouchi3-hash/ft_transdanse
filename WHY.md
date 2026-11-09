1. Why `providers: [EchoGateway]`?

باش NestJs ينشأ نسخة من EchoGateway in memory بدون كتابته في providers فراه مغاديش نقدرو نخدمو بيه


2. From the results of Step 5: Why does the decorator control the metadata, and why does `NotesService` have `@Injectable()` but `NotesController` does not?

لأن في typescript عندما تكتب لمتغير نوعه فعند compile time يتغير كود إلى لغة Js و هنا نقد types فلا يمكن في تلك اللحظة أن يعرف NestJs أي dependecy of this class أما إدا قمت ب set emitDecoratorMetadata: true
و أضفت decorator of class فهنا NestJs سينشأ array فيها جميع التبعيات و أنواعها وينشأ منها نسخة ويحقنها لتلك الكلاس
أما بنسبة لسؤال الثاني فإنه يضع لها decorator Injectable لكي يقول ل NestJs أن هده class قابل للحقن


1. When is `return` not enough, especially with `@Ack()`? (You've seen a hint before.)

فاش كنكون محتاج أني نعرف إدا وصلت البيانات لطرف الأخر أولا