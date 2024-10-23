**Giới thiệu**

Vậy là bạn đã quyết định mua một cuốn sách về TypeScript. Tại sao?

Có thể là vì bạn đã chán ngấy những lỗi **JavaScript** kỳ lạ như "cannot read property blah of undefined". Hoặc có thể bạn đã nghe nói rằng **TypeScript** có thể giúp mã của bạn dễ dàng mở rộng hơn, và bạn muốn tìm hiểu tất cả những điều ồn ào xung quanh nó. Hoặc bạn là một người dùng **C#**, và đã nghĩ đến việc thử nghiệm với **JavaScript**. Hay bạn là một lập trình viên hàm (functional programmer), và quyết định rằng đã đến lúc nâng cao kỹ năng của mình. Hoặc sếp của bạn đã quá chán nản với việc mã của bạn gây ra các vấn đề trong môi trường sản xuất đến mức đã tặng cho bạn cuốn sách này như một món quà Giáng sinh (dừng tôi lại nếu tôi đang đi đúng hướng).

Dù lý do của bạn là gì, những gì bạn đã nghe là đúng. **TypeScript** là ngôn ngữ sẽ thúc đẩy thế hệ tiếp theo của các ứng dụng web, ứng dụng di động, dự án **NodeJS**, và các thiết bị **Internet of Things (IoT)**. Nó sẽ giúp chương trình của bạn an toàn hơn bằng cách kiểm tra các lỗi phổ biến, phục vụ như tài liệu cho chính bạn và các kỹ sư trong tương lai, giúp việc **refactoring** trở nên dễ dàng, và làm cho một nửa trong số các bài kiểm tra đơn vị của bạn trở nên không cần thiết (“Bài kiểm tra đơn vị nào?”). **TypeScript** sẽ gấp đôi năng suất của bạn với tư cách là một lập trình viên, và nó sẽ giúp bạn có một buổi hẹn với cô nhân viên pha chế dễ thương bên kia đường.

Nhưng trước khi bạn lao ra đường, hãy cùng phân tích một chút, bắt đầu từ điều này: khi tôi nói "an toàn hơn" nghĩa là gì? Những gì tôi đang nói đến, tất nhiên, là **độ an toàn kiểu (type safety)**.

**Độ an toàn kiểu (Type safety)**: Sử dụng kiểu dữ liệu để ngăn chặn chương trình thực hiện những việc không hợp lệ.

Dưới đây là một vài ví dụ về những điều không hợp lệ:
- Nhân một số với một danh sách
- Gọi một hàm với một danh sách các chuỗi khi thực sự nó cần một danh sách các đối tượng
- Gọi một phương thức trên một đối tượng khi phương thức đó thực sự không tồn tại trên đối tượng đó
- Nhập một mô-đun đã được di chuyển gần đây

Có một số ngôn ngữ lập trình cố gắng tận dụng tối đa các lỗi như thế này. Chúng cố gắng tìm ra điều bạn thực sự muốn khi thực hiện điều gì đó không hợp lệ, vì vậy, bạn làm những gì bạn có thể, đúng không? Lấy **JavaScript** làm ví dụ:

```javascript
3 + []            
let obj = {}
obj.foo           
function a(b) {
 return b/2
}
a("z")            
```

- **Đánh giá** thành chuỗi "3"
- **Đánh giá** thành `undefined`
- **Đánh giá** thành `NaN`

Hãy lưu ý rằng thay vì ném ra các ngoại lệ khi bạn cố gắng thực hiện những điều rõ ràng không hợp lệ, **JavaScript** cố gắng tận dụng điều đó và tránh các ngoại lệ bất cứ khi nào có thể. Liệu **JavaScript** có hữu ích không? Chắc chắn rồi. Liệu điều đó có giúp bạn dễ dàng phát hiện lỗi nhanh chóng không? Có thể là không.

Bây giờ hãy tưởng tượng nếu **JavaScript** ném ra nhiều ngoại lệ hơn thay vì âm thầm tận dụng những gì chúng ta cung cấp. Chúng ta có thể nhận được phản hồi như thế này:

```javascript
3 + []    // Lỗi: Bạn có thực sự muốn cộng một số với một mảng không?
let obj = {}  
obj.foo   // Lỗi: Bạn quên định nghĩa thuộc tính "foo" trên obj.
function a(b) {
     return b/2
}
a("z")  // Lỗi: Hàm "a" mong đợi một số,
          // nhưng bạn đã cung cấp một chuỗi.
```

Đừng hiểu sai ý tôi: cố gắng sửa chữa những sai lầm của chúng ta là một tính năng thú vị của một ngôn ngữ lập trình (nếu chỉ có nó hoạt động cho nhiều thứ hơn chỉ các chương trình!). Nhưng với **JavaScript**, tính năng này tạo ra một sự ngắt quãng giữa khi bạn mắc lỗi trong mã của mình và khi bạn phát hiện ra rằng bạn đã mắc lỗi. Thường thì điều đó có nghĩa là lần đầu tiên bạn nghe về lỗi của mình sẽ từ người khác.

Vậy đây là một câu hỏi: khi nào chính xác **JavaScript** cho bạn biết rằng bạn đã mắc lỗi?

Đúng rồi: khi bạn thực sự chạy chương trình của mình. Chương trình của bạn có thể được chạy khi bạn thử nghiệm nó trong một trình duyệt, hoặc khi một người dùng truy cập vào trang web của bạn, hoặc khi bạn chạy một bài kiểm tra đơn vị. Nếu bạn có kỷ luật và viết nhiều bài kiểm tra đơn vị và bài kiểm tra end-to-end, kiểm tra khói mã của bạn trước khi đẩy nó lên, và thử nghiệm nội bộ trong một thời gian trước khi gửi nó đến người dùng, bạn hy vọng sẽ phát hiện ra lỗi của mình trước khi người dùng làm điều đó. Nhưng nếu bạn không làm vậy thì sao?

Đó là lúc **TypeScript** xuất hiện. Còn tuyệt hơn nữa là thực tế rằng **TypeScript** cung cấp cho bạn các thông báo lỗi hữu ích là khi nào nó cung cấp chúng cho bạn: **TypeScript** cung cấp các thông báo lỗi trong trình soạn thảo văn bản của bạn, khi bạn gõ. Điều đó có nghĩa là bạn không phải dựa vào các bài kiểm tra đơn vị hoặc bài kiểm tra khói hoặc đồng nghiệp để phát hiện các vấn đề như vậy: **TypeScript** sẽ phát hiện chúng cho bạn và cảnh báo bạn về chúng khi bạn viết chương trình của mình. Hãy xem **TypeScript** nói gì về ví dụ trước đó của chúng ta:

```javascript
3 + [] // Lỗi TS2365: Toán tử '+' không thể áp dụng cho các kiểu '3'
          // và 'never[]'.

let obj = {}
obj.foo    // Lỗi TS2339: Thuộc tính 'foo' không tồn tại trên kiểu '{}'.

function a(b: number) {
      return b / 2
}

a("z")            
// Lỗi TS2345: Tham số của kiểu '"z"' không thể gán cho 
                     // tham số của kiểu 'number'.
```

Ngoài việc loại bỏ toàn bộ các loại lỗi liên quan đến kiểu, điều này thực sự sẽ thay đổi cách bạn viết mã. Bạn sẽ thấy mình phác thảo một chương trình ở cấp độ kiểu trước khi bạn điền vào cấp độ giá trị; bạn sẽ suy nghĩ về các trường hợp biên khi thiết kế chương trình của mình, không phải như một suy nghĩ sau; và bạn sẽ thiết kế các chương trình đơn giản hơn, nhanh hơn, dễ hiểu hơn và dễ bảo trì hơn.

Bạn đã sẵn sàng để bắt đầu hành trình chưa? Hãy cùng đi nào!

