


**Trong vài chương tới, tôi sẽ giới thiệu ngôn ngữ TypeScript, cung cấp cho bạn cái nhìn tổng quan về cách mà **TypeScript Compiler (TSC)** hoạt động, và đưa bạn tham quan các tính năng của TypeScript cũng như các mẫu mà bạn có thể phát triển với chúng. Chúng ta sẽ bắt đầu với **compiler**.**

**Biên dịch**

**Compiler**

Tùy thuộc vào những ngôn ngữ lập trình mà bạn đã làm việc trong quá khứ (trước khi bạn quyết định mua cuốn sách này và cam kết với một cuộc sống an toàn kiểu dữ liệu), bạn sẽ có một hiểu biết khác nhau về cách thức hoạt động của các chương trình. Cách mà TypeScript hoạt động là khác thường so với các ngôn ngữ chính thống khác như JavaScript hoặc Java, vì vậy điều quan trọng là chúng ta phải đồng nhất trước khi đi xa hơn.

Hãy bắt đầu với một cái nhìn tổng quát: các chương trình là các tệp chứa một loạt văn bản được viết bởi bạn, lập trình viên. Văn bản đó được phân tích bởi một chương trình đặc biệt gọi là **compiler**, chương trình này chuyển đổi nó thành một **abstract syntax tree (AST)**, một cấu trúc dữ liệu mà bỏ qua các yếu tố như khoảng trắng, chú thích, và vị trí của bạn trong cuộc tranh luận về tab và space. Sau đó, **compiler** chuyển đổi AST đó thành một đại diện cấp thấp hơn được gọi là **bytecode**. Bạn có thể đưa **bytecode** đó vào một chương trình khác gọi là **runtime** để đánh giá và nhận kết quả. Vì vậy, khi bạn chạy một chương trình, những gì bạn thực sự làm là yêu cầu **runtime** đánh giá **bytecode** được tạo ra bởi **compiler** từ **AST** đã được phân tích từ mã nguồn của bạn. Các chi tiết có thể khác nhau, nhưng đối với hầu hết các ngôn ngữ, đây là một cái nhìn tổng quan chính xác ở mức cao.

Một lần nữa, các bước là:

1. Chương trình được phân tích thành một **AST**.
2. **AST** được biên dịch thành **bytecode**.
3. **Bytecode** được đánh giá bởi **runtime**.

Nơi mà TypeScript đặc biệt là thay vì biên dịch trực tiếp thành **bytecode**, TypeScript biên dịch thành... mã **JavaScript**! Bạn sau đó chạy mã **JavaScript** đó như bạn thường làm—trong trình duyệt của bạn, hoặc với **NodeJS**, hoặc bằng tay với giấy và bút (cho bất kỳ ai đọc điều này sau khi cuộc nổi dậy của máy móc bắt đầu).

Vào thời điểm này, bạn có thể đang nghĩ: “Chờ đã! Trong chương trước, bạn đã nói rằng TypeScript làm cho mã của tôi an toàn hơn! Khi nào điều đó xảy ra?”

Câu hỏi hay. Tôi thực sự đã bỏ qua một bước quan trọng: sau khi **TypeScript Compiler** tạo ra một **AST** cho chương trình của bạn—nhưng trước khi nó phát hành mã—nó sẽ kiểm tra kiểu (typecheck) mã của bạn.

<+> **Typechecker**: Một chương trình đặc biệt xác minh rằng mã của bạn là an toàn kiểu dữ liệu.

Việc kiểm tra kiểu này là phép thuật đằng sau TypeScript. Đây là cách TypeScript đảm bảo rằng chương trình của bạn hoạt động như bạn mong đợi, rằng không có sai sót rõ ràng, và rằng người phục vụ dễ thương bên kia đường thực sự sẽ gọi lại cho bạn khi họ nói họ sẽ làm vậy. (Đừng lo, có thể họ chỉ bận rộn thôi.)

Vì vậy, nếu chúng ta bao gồm việc kiểm tra kiểu và phát hành **JavaScript**, quá trình biên dịch TypeScript bây giờ trông khoảng như Hình 2-1:
![Không có mô tả.](https://scontent-hkg4-1.xx.fbcdn.net/v/t1.15752-9/462566773_1748643779285830_2529742113260147823_n.png?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeG-RqlefGDkfivCyd3qiYDFGBVP8Gd2TDkYFU_wZ3ZMOWiS8HSQbTcF3OnU95DpdACZZvzN7qMQqL8XppscoPqh&_nc_ohc=12b-MyWNnXcQ7kNvgFMK_GS&_nc_ht=scontent-hkg4-1.xx&_nc_gid=AJnTq53LsD3DDiztKo3IFP6&oh=03_Q7cD1QEXG6GhQhv_VgOSr2_h0YM4qaijk3l3vLzabM3LzhKxFw&oe=67406BB4)
**Hình 2-1. Biên dịch và chạy TypeScript**

Các bước 1–3 được thực hiện bởi **TSC**, và các bước 4–6 được thực hiện bởi **JavaScript runtime** sống trong trình duyệt của bạn, **NodeJS**, hoặc bất kỳ động cơ **JavaScript** nào bạn đang sử dụng.

``Các trình biên dịch và runtime JavaScript thường được kết hợp thành một chương trình duy nhất gọi là **engine**; với tư cách là một lập trình viên, đây là những gì bạn thường tương tác. Đây là cách mà **V8** (động cơ cung cấp năng lượng cho **NodeJS**, **Chrome**, và **Opera**), **SpiderMonkey** (Firefox), **JSCore** (Safari), và **Chakra** (Edge) hoạt động, và đây là điều khiến **JavaScript** có vẻ như là một ngôn ngữ được thông dịch.``

Trong quá trình này, các bước 1–2 sử dụng kiểu dữ liệu của chương trình của bạn; bước 3 thì không. Điều này đáng được nhấn mạnh: khi **TSC** biên dịch mã của bạn từ TypeScript sang JavaScript, nó sẽ không xem xét các kiểu của bạn. Điều này có nghĩa là các kiểu của chương trình của bạn sẽ không bao giờ ảnh hưởng đến đầu ra được tạo ra của chương trình của bạn, và chỉ được sử dụng cho việc kiểm tra kiểu. Tính năng này làm cho việc thử nghiệm, cập nhật và cải thiện các kiểu của chương trình của bạn trở nên an toàn, mà không có rủi ro làm hỏng ứng dụng của bạn.

**Hệ thống kiểu dữ liệu**

Các ngôn ngữ hiện đại có đủ loại hệ thống kiểu dữ liệu khác nhau.  
<+> **Hệ thống kiểu dữ liệu**: Một tập hợp các quy tắc mà một **typechecker** sử dụng để gán kiểu cho chương trình của bạn.

Thông thường, có hai loại hệ thống kiểu dữ liệu: hệ thống kiểu mà bạn phải cho **compiler** biết kiểu của mọi thứ bằng cú pháp rõ ràng, và hệ thống kiểu mà tự động suy diễn kiểu của mọi thứ cho bạn. Cả hai cách tiếp cận đều có những ưu và nhược điểm.

TypeScript được lấy cảm hứng từ cả hai loại hệ thống kiểu dữ liệu: bạn có thể chú thích rõ ràng các kiểu của mình, hoặc bạn có thể để TypeScript tự suy diễn hầu hết các kiểu cho bạn.[1]

Để báo hiệu rõ ràng cho TypeScript biết các kiểu của bạn là gì, hãy sử dụng chú thích. Chú thích có dạng `value: type` và nói với **typechecker**, “Này! Bạn thấy giá trị này ở đây không? Kiểu của nó là `type`.” Hãy xem một vài ví dụ (các chú thích theo sau mỗi dòng là các kiểu thực tế được suy diễn bởi TypeScript):

```typescript
let a: number = 1 // a là một số
let b: string = 'hello' // b là một chuỗi
let c: boolean[] = [true, false] // c là một mảng các giá trị boolean
```

Và nếu bạn muốn TypeScript tự suy diễn các kiểu của bạn, chỉ cần bỏ qua chúng và để TypeScript làm việc:

```typescript
let a = 1 // a là một số
let b = 'hello' // b là một chuỗi
let c = [true, false]  // c là một mảng các giá trị boolean
```

Ngay lập tức, bạn sẽ nhận thấy TypeScript rất giỏi trong việc suy diễn các kiểu cho bạn. Nếu bạn bỏ qua các chú thích, các kiểu vẫn giống nhau! Trong suốt cuốn sách này, chúng ta sẽ chỉ sử dụng các chú thích khi cần thiết và để TypeScript thực hiện phép thuật suy diễn của nó khi có thể.  
**“Nói chung, phong cách tốt là để TypeScript suy diễn càng nhiều kiểu càng tốt cho bạn, giữ cho mã có kiểu rõ ràng ở mức tối thiểu.”**

**TypeScript so với JavaScript**

Hãy xem xét sâu hơn về hệ thống kiểu dữ liệu của TypeScript và cách nó so sánh với hệ thống kiểu dữ liệu của JavaScript. Bảng 2-1 trình bày một cái nhìn tổng quan. Hiểu rõ những khác biệt là chìa khóa để xây dựng một mô hình tư duy về cách TypeScript hoạt động.

**Bảng 2-1. So sánh hệ thống kiểu dữ liệu của JavaScript và TypeScript**

| Tính năng hệ thống kiểu dữ liệu                   | JavaScript          | TypeScript        |
|--------------------------------------------------|---------------------|--------------------|
| Kiểu được gán như thế nào?                       | Động (Dynamically)   | Tĩnh (Statically)   |
| Các kiểu có được tự động chuyển đổi không?      | Có (Yes)            | Không (mostly)      |
| Khi nào các kiểu được kiểm tra?                  | Tại thời gian chạy  | Tại thời gian biên dịch |
| Khi nào các lỗi được phát hiện?                  | Tại thời gian chạy (mostly) | Tại thời gian biên dịch (mostly) |

### Cách thức ràng buộc kiểu dữ liệu

**Ràng buộc kiểu động** có nghĩa là JavaScript cần phải thực thi chương trình của bạn để biết được các kiểu dữ liệu trong đó. JavaScript không biết kiểu của bạn trước khi chạy chương trình.

**TypeScript** là một ngôn ngữ kiểu dần dần, có nghĩa là TypeScript hoạt động tốt nhất khi biết kiểu của mọi thứ trong chương trình của bạn tại thời gian biên dịch, nhưng nó không nhất thiết phải biết mọi kiểu để biên dịch chương trình của bạn. Ngay cả trong một chương trình không kiểu, TypeScript có thể suy diễn một số kiểu cho bạn và phát hiện một số lỗi, nhưng nếu không biết kiểu cho mọi thứ, nó sẽ để nhiều lỗi trôi qua tay người dùng.

Việc **ràng buộc kiểu dần dần** này rất hữu ích cho việc chuyển đổi các mã nguồn cũ từ JavaScript không kiểu sang TypeScript có kiểu (thông tin thêm sẽ được trình bày trong phần “Chuyển đổi dần dần từ JavaScript sang TypeScript”). Tuy nhiên, trừ khi bạn đang trong quá trình chuyển đổi mã nguồn của mình, bạn nên đặt mục tiêu cho 100% độ phủ kiểu. Đây là cách tiếp cận mà cuốn sách này theo đuổi, trừ khi có ghi chú cụ thể.

### Các kiểu có được tự động chuyển đổi không?

JavaScript có kiểu yếu, có nghĩa là nếu bạn thực hiện một thao tác không hợp lệ như cộng một số và một mảng (như đã làm trong Chương 1), nó sẽ áp dụng một loạt các quy tắc để tìm ra ý định thực sự của bạn để có thể làm tốt nhất với những gì bạn đã cung cấp. Hãy xem xét ví dụ cụ thể về cách JavaScript đánh giá `3 + [1]`:

1. JavaScript nhận thấy rằng `3` là một số và `[1]` là một mảng.
2. Bởi vì chúng ta đang sử dụng dấu `+`, nó giả định rằng chúng ta muốn nối hai giá trị này lại với nhau.
3. Nó tự động chuyển đổi `3` thành chuỗi, tạo thành `"3"`.
4. Nó tự động chuyển đổi `[1]` thành chuỗi, tạo thành `"1"`.
5. Nó nối các kết quả lại với nhau, tạo thành `"31"`.

Chúng ta cũng có thể làm điều này một cách rõ ràng hơn (để JavaScript tránh thực hiện các bước 1, 3 và 4):

```javascript
3 + [1];  // đánh giá thành "31"
(3).toString() + [1].toString(); // đánh giá thành "31"
```

Trong khi JavaScript cố gắng giúp bạn bằng cách thực hiện các chuyển đổi kiểu thông minh, TypeScript sẽ báo lỗi ngay khi bạn thực hiện điều gì đó không hợp lệ. Khi bạn chạy mã JavaScript đó qua TypeScript Compiler (TSC), bạn sẽ nhận được lỗi:

```typescript
3 + [1];   // Lỗi TS2365: Toán tử '+' không thể áp dụng cho
            // các kiểu '3' và 'number[]'.
(3).toString() + [1].toString();  // đánh giá thành "31"
```

Nếu bạn làm điều gì đó không hợp lý, TypeScript sẽ thông báo lỗi, và nếu bạn rõ ràng về ý định của mình, TypeScript sẽ không cản trở bạn. Hành vi này rất hợp lý: ai lại đi cộng một số và một mảng, mong đợi kết quả là một chuỗi (tất nhiên, ngoại trừ Bavmorda, phù thủy JavaScript, người dành thời gian lập trình trong ánh nến ở tầng hầm của công ty khởi nghiệp của bạn)?

Loại chuyển đổi ngầm mà JavaScript thực hiện có thể là một nguồn lỗi rất khó theo dõi và là nỗi ám ảnh của nhiều lập trình viên JavaScript. Nó khiến cho các kỹ sư gặp khó khăn trong việc hoàn thành công việc của mình và càng khó khăn hơn trong việc mở rộng mã nguồn trên một đội ngũ lớn, vì mỗi kỹ sư cần phải hiểu các giả định ngầm mà mã nguồn của bạn đưa ra.

Tóm lại, nếu bạn phải chuyển đổi kiểu, hãy thực hiện điều đó một cách rõ ràng.

### Khi nào các kiểu được kiểm tra?

Trong hầu hết các trường hợp, JavaScript không quan tâm đến các kiểu mà bạn cung cấp, và thay vào đó cố gắng làm tốt nhất với những gì bạn đã cung cấp. 

**TypeScript**, ngược lại, kiểm tra kiểu mã của bạn tại thời gian biên dịch (nhớ lại bước 2 trong danh sách ở đầu chương này), vì vậy bạn không cần phải thực thi mã của mình để nhận thấy lỗi từ ví dụ trước đó. TypeScript phân tích tĩnh mã của bạn để tìm lỗi như vậy và cho bạn biết trước khi bạn chạy mã. Nếu mã của bạn không biên dịch, đó là một dấu hiệu tốt rằng bạn đã mắc lỗi và nên sửa chữa trước khi cố gắng chạy mã.

![Mở ảnh](https://scontent.xx.fbcdn.net/v/t1.15752-9/462551620_744390791183231_6765932336210180638_n.png?_nc_cat=101&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeGK-79ah4qs2Y-uarQn0VJF_TBAtAElhpb9MEC0ASWGlmdOmBMhrvULI708kc8aEaMPYGjcGikcRp-SYOHusYtO&_nc_ohc=NYKmDDBqANYQ7kNvgEGe6Ee&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AU1sMISNap24TXyeYVN9W5t&oh=03_Q7cD1QGnOF24wmh4sBbpdpNK5EoN12PEUjLhIO4k9YaNI4i8Jg&oe=67407C85)

**Hình 2-2 cho thấy điều gì xảy ra khi tôi nhập ví dụ mã cuối cùng vào VSCode (trình soạn thảo mã yêu thích của tôi).**

Với một tiện ích mở rộng TypeScript tốt cho trình soạn thảo mã bạn thích, lỗi sẽ xuất hiện dưới dạng một đường gạch đỏ dưới mã của bạn khi bạn nhập. Điều này làm tăng tốc độ phản hồi giữa việc viết mã, nhận ra rằng bạn đã mắc lỗi và cập nhật mã để sửa lỗi đó.

### Khi nào các lỗi được phát hiện?

Khi JavaScript ném ra ngoại lệ hoặc thực hiện các chuyển đổi kiểu ngầm, nó thực hiện điều đó tại thời gian chạy [2]. Điều này có nghĩa là bạn phải thực sự chạy chương trình của mình để nhận được tín hiệu hữu ích rằng bạn đã thực hiện điều gì đó không hợp lệ. Trong trường hợp tốt nhất, điều này có nghĩa là như một phần của một bài kiểm tra đơn vị; trong trường hợp tồi tệ nhất, điều đó có nghĩa là một email giận dữ từ một người dùng.

**TypeScript** ném ra cả lỗi liên quan đến cú pháp và lỗi liên quan đến kiểu tại thời gian biên dịch. Trong thực tế, điều này có nghĩa là những loại lỗi này sẽ xuất hiện trong trình soạn thảo mã của bạn, ngay khi bạn nhập—đó là một trải nghiệm tuyệt vời nếu bạn chưa từng làm việc với một ngôn ngữ tĩnh kiểu được biên dịch theo từng phần trước đây.[3]

Tuy nhiên, có rất nhiều lỗi mà TypeScript không thể phát hiện cho bạn tại thời gian biên dịch—những thứ như tràn ngăn xếp, kết nối mạng bị hỏng và dữ liệu đầu vào của người dùng không đúng định dạng—vẫn sẽ dẫn đến ngoại lệ tại thời gian chạy. Điều mà TypeScript làm là tạo ra các lỗi tại thời gian biên dịch từ hầu hết các lỗi mà nếu không thì sẽ là lỗi tại thời gian chạy trong thế giới JavaScript thuần túy.

**Cài đặt Trình Soạn Thảo Mã**

Bây giờ bạn đã có một chút trực giác về cách mà **TypeScript Compiler** và hệ thống kiểu dữ liệu hoạt động, hãy thiết lập trình soạn thảo mã của bạn để chúng ta có thể bắt đầu tìm hiểu một số mã thực tế.

Bắt đầu bằng cách tải xuống một trình soạn thảo mã để viết mã của bạn. Tôi thích **VSCode** vì nó cung cấp trải nghiệm chỉnh sửa TypeScript đặc biệt tốt, nhưng bạn cũng có thể sử dụng **Sublime Text**, **Atom**, **Vim**, **WebStorm**, hoặc bất kỳ trình soạn thảo nào mà bạn thích. Các kỹ sư thường rất kén chọn về **IDE**, vì vậy tôi sẽ để bạn quyết định. Nếu bạn muốn sử dụng **VSCode**, hãy làm theo hướng dẫn trên trang web để thiết lập nó.

**TSC** là một ứng dụng dòng lệnh được viết bằng **TypeScript** [4], điều này có nghĩa là bạn cần **NodeJS** để chạy nó. Hãy làm theo hướng dẫn trên trang web chính thức của **NodeJS** để cài đặt **NodeJS** trên máy của bạn.

**NodeJS** đi kèm với **NPM**, một trình quản lý gói mà bạn sẽ sử dụng để quản lý các phụ thuộc của dự án và tổ chức quá trình biên dịch. Chúng ta sẽ bắt đầu bằng cách sử dụng nó để cài đặt **TSC** và **TSLint** (một công cụ kiểm tra mã cho TypeScript). Bắt đầu bằng cách mở terminal của bạn và tạo một thư mục mới, sau đó khởi tạo một dự án NPM mới trong đó:

```bash
# Tạo một thư mục mới
mkdir chapter-2
cd chapter-2

# Khởi tạo một dự án NPM mới (theo các hướng dẫn)
npm init

# Cài đặt TSC, TSLint, và khai báo kiểu cho NodeJS
npm install --save-dev typescript tslint @types/node
```

**tsconfig.json**  
Mỗi dự án TypeScript nên bao gồm một tệp có tên là **tsconfig.json** trong thư mục gốc của nó. Tệp **tsconfig.json** là nơi các dự án TypeScript định nghĩa những thứ như tệp nào sẽ được biên dịch, thư mục nào sẽ biên dịch chúng đến, và phiên bản JavaScript nào sẽ được xuất ra.

Tạo một tệp mới có tên là **tsconfig.json** trong thư mục gốc của bạn (sử dụng lệnh `touch tsconfig.json`)[5], sau đó mở nó trong trình soạn thảo mã của bạn và cho nó các nội dung sau:

```json
{
    "compilerOptions": {
        "lib": ["es2015"],
        "module": "commonjs",
        "outDir": "dist",
        "sourceMap": true,
        "strict": true,
        "target": "es2015"
    },
    "include": [
        "src"
    ]
}
```

**Tóm tắt Các Tùy Chọn Trong tsconfig.json**

Hãy cùng xem qua một số tùy chọn trong tệp **tsconfig.json** và ý nghĩa của chúng (Bảng 2-2):

| Tùy Chọn        | Mô Tả                                                                                                                                                                                                                                                                                   |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **include**      | Các thư mục mà TSC sẽ tìm kiếm để tìm các tệp TypeScript của bạn.                                                                                                                                                                                                                   |
| **lib**          | Các API mà TSC nên giả định là tồn tại trong môi trường bạn sẽ chạy mã. Điều này bao gồm những thứ như `Function.prototype.bind` của ES5, `Object.assign` của ES2015, và `document.querySelector` của DOM.                                                                      |
| **module**       | Hệ thống module nào mà TSC nên biên dịch mã của bạn thành (CommonJS, SystemJS, ES2015, v.v.).                                                                                                                                                                                       |
| **outDir**       | Thư mục mà TSC nên đặt mã JavaScript đã được tạo ra của bạn vào.                                                                                                                                                                                                                     |
| **strict**       | Kiểm tra càng nghiêm ngặt càng tốt khi kiểm tra mã không hợp lệ. Tùy chọn này yêu cầu tất cả mã của bạn phải được kiểu hóa đúng cách. Chúng ta sẽ sử dụng nó cho tất cả các ví dụ trong cuốn sách, và bạn cũng nên sử dụng nó cho dự án TypeScript của mình.                      |
| **target**       | Phiên bản JavaScript nào mà TSC nên biên dịch mã của bạn thành (ES3, ES5, ES2015, ES2016, v.v.).                                                                                                                                                                                    |

Đây chỉ là một vài trong số các tùy chọn có sẵn—**tsconfig.json** hỗ trợ hàng tá tùy chọn, và các tùy chọn mới liên tục được thêm vào. Bạn sẽ không thấy mình thay đổi những cái này nhiều trong thực tế, ngoài việc điều chỉnh cài đặt module và target khi chuyển sang một bundler module mới, thêm `"dom"` vào **lib** khi viết TypeScript cho trình duyệt (bạn sẽ tìm hiểu thêm về điều này trong Chương 12), hoặc điều chỉnh mức độ nghiêm ngặt của bạn khi chuyển đổi mã JavaScript hiện có sang TypeScript (xem “Dần Dần Chuyển Đổi Từ JavaScript Sang TypeScript” trên trang 236). Để có danh sách đầy đủ và cập nhật các tùy chọn được hỗ trợ, hãy truy cập tài liệu chính thức trên trang web TypeScript.

Lưu ý rằng trong khi việc sử dụng tệp **tsconfig.json** để cấu hình TSC rất tiện lợi vì nó cho phép chúng ta kiểm tra cấu hình đó vào nguồn kiểm soát, bạn cũng có thể thiết lập hầu hết các tùy chọn của TSC từ dòng lệnh. Chạy `./node_modules/.bin/tsc --help` để xem danh sách các tùy chọn dòng lệnh có sẵn.

---

### TSLint.json

Dự án của bạn cũng nên có một tệp **tslint.json** chứa cấu hình TSLint của bạn, quy định những quy tắc phong cách mà bạn muốn cho mã của mình (tab hay space, v.v.).

**Sử dụng TSLint là tùy chọn, nhưng rất được khuyến nghị cho tất cả các dự án TypeScript để duy trì một phong cách lập trình nhất quán. Quan trọng nhất, nó sẽ giúp bạn tránh tranh cãi về phong cách mã với đồng nghiệp trong quá trình xem xét mã.**

Lệnh sau sẽ tạo một tệp **tslint.json** với cấu hình TSLint mặc định:

```bash
./node_modules/.bin/tslint --init
```

Bạn có thể thêm các điều chỉnh vào tệp này để phù hợp với phong cách lập trình của riêng mình. Ví dụ, tệp **tslint.json** của tôi trông như sau:

```json
{
    "defaultSeverity": "error",
    "extends": [
        "tslint:recommended"
    ],
    "jsRules": {},
    "rules": {
        "semicolon": false,
        "trailing-comma": false
    },
    "rulesDirectory": []
}

```
### Giải thích các thuộc tính:

1. **`defaultSeverity`**: 
   - Giá trị: `"error"`
   - Ý nghĩa: Đây là mức độ nghiêm trọng mặc định cho các lỗi. Nếu có lỗi nào không được chỉ định mức độ, TSLint sẽ coi chúng là lỗi (`error`). Bạn có thể thay đổi giá trị này thành `"warning"` nếu bạn muốn cảnh báo thay vì lỗi.

2. **`extends`**:
   - Giá trị: `["tslint:recommended"]`
   - Ý nghĩa: Thuộc tính này cho phép bạn kế thừa các quy tắc từ cấu hình TSLint tiêu chuẩn (`recommended`). Điều này có nghĩa là bạn sẽ có tất cả các quy tắc khuyến nghị sẵn có mà TSLint cung cấp.

3. **`jsRules`**:
   - Giá trị: `{}` (rỗng)
   - Ý nghĩa: Thuộc tính này được sử dụng để định nghĩa các quy tắc áp dụng cho mã JavaScript. Trong trường hợp này, không có quy tắc nào được định nghĩa, có nghĩa là bạn sẽ không áp dụng các quy tắc nào cho mã JavaScript.

4. **`rules`**:
   - Giá trị: 
     ```json
     {
         "semicolon": false,
         "trailing-comma": false
     }
     ```
   - Ý nghĩa: Đây là nơi bạn định nghĩa các quy tắc cụ thể cho dự án của mình:
     - **`semicolon`: `false`**: Điều này có nghĩa là không yêu cầu phải có dấu chấm phẩy ở cuối dòng. Bạn có thể viết mã mà không cần chấm phẩy.
     - **`trailing-comma`: `false`**: Quy tắc này yêu cầu không có dấu phẩy thừa ở cuối các danh sách (ví dụ: trong mảng hoặc đối tượng). Bạn sẽ không được phép có dấu phẩy sau phần tử cuối cùng.

5. **`rulesDirectory`**:
   - Giá trị: `[]` (rỗng)
   - Ý nghĩa: Thuộc tính này có thể được sử dụng để chỉ định thư mục chứa các quy tắc tùy chỉnh. Trong trường hợp này, nó không chứa bất kỳ thư mục nào, có nghĩa là không có quy tắc tùy chỉnh nào được chỉ định.
---

### Tạo index.ts

Bây giờ bạn đã thiết lập xong **tsconfig.json** và **tslint.json**, hãy tạo một thư mục **src** chứa tệp TypeScript đầu tiên của bạn:

```bash
mkdir src
touch src/index.ts
```

Cấu trúc thư mục của dự án của bạn bây giờ nên trông như thế này:

```
chapter-2/
├── node_modules/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
└── tslint.json
```

Mở tệp **src/index.ts** trong trình soạn thảo mã của bạn và nhập mã TypeScript sau:

```typescript
console.log('Hello TypeScript!');
```

Sau đó, biên dịch và chạy mã TypeScript của bạn:

```bash
# Biên dịch mã TypeScript với TSC
./node_modules/.bin/tsc

# Chạy mã của bạn với NodeJS
node ./dist/index.js
```

Nếu bạn đã thực hiện tất cả các bước ở đây, mã của bạn sẽ chạy và bạn sẽ thấy một thông báo duy nhất trong console của mình:
```
Hello TypeScript!
```

Đó là tất cả—bạn vừa thiết lập và chạy dự án TypeScript đầu tiên của mình từ đầu. Làm tốt lắm!

**Vì đây có thể là lần đầu tiên bạn thiết lập một dự án TypeScript từ đầu, tôi muốn hướng dẫn từng bước để bạn có cảm giác cho tất cả các phần đang hoạt động. Có một vài cách rút ngắn mà bạn có thể thực hiện để làm điều này nhanh hơn lần sau:**
- Cài đặt **ts-node**, và sử dụng nó để biên dịch và chạy mã TypeScript của bạn với một lệnh duy nhất.
- Sử dụng một công cụ khởi tạo như **typescript-node-starter** để nhanh chóng tạo ra cấu trúc thư mục cho bạn.

**Bài Tập**

Bây giờ mà môi trường của bạn đã được thiết lập, hãy mở tệp **src/index.ts** trong trình soạn thảo mã của bạn. Nhập mã sau:

```typescript
let a = 1 + 2;
let b = a + 3;
let c = {
    apple: a,
    banana: b
};

let d = c.apple * 4;
```

Bây giờ di chuột qua a, b, c và d, và lưu ý cách TypeScript suy luận kiểu của tất cả các biến của bạn: a là một số, b là một số, c là một đối tượng với hình dạng cụ thể, và d cũng là một số.
![Mở ảnh](https://scontent.xx.fbcdn.net/v/t1.15752-9/462558892_533405536067628_5800998223996452843_n.png?_nc_cat=109&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeFmfZ7fLYuiZZyyi6f2P0Iwc0uoA1HcHfpzS6gDUdwd-n6nKe81E74MGA3YsrTbpyB_dZtNmN1tPiKggGn-gEeZ&_nc_ohc=mOvoK0s1TmIQ7kNvgHYID0w&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AWPRW3aF31BLkVEOGlHVI2Y&oh=03_Q7cD1QEKjBTxRA91o0DNby01PRe_WmH5coBzrM4pKqETzwRPKg&oe=67406923)
												**Hình 2-3. TypeScript suy luận kiểu cho bạn.**
												
Hãy thử nghiệm với mã của bạn một chút. Xem liệu bạn có thể:
- Khiến TypeScript hiển thị một dấu gạch chéo đỏ khi bạn làm điều gì đó không hợp lệ (chúng tôi gọi đây là “ném ra một TypeError”).
- Đọc TypeError và cố gắng hiểu nó có nghĩa là gì.
- Sửa lỗi TypeError và xem dấu gạch chéo đỏ biến mất.

Nếu bạn muốn thử thách hơn, hãy cố gắng viết một đoạn mã mà TypeScript không thể suy luận kiểu cho nó.
