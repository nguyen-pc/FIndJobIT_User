import React, { useEffect, useState } from "react";
import { Card, Select, Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const { Search } = Input;

// Dữ liệu mẫu
const mockQuestions = [
  {
    _id: "1",
    question: "Tại sao khi bind v-for thường phải mapping key?",
    answer:
      "Khi sử dụng `v-for` để render một danh sách các phần tử, việc cung cấp một `key` duy nhất cho mỗi phần tử là cực kỳ quan trọng để Vue.js có thể theo dõi danh tính của từng node. Điều này giúp Vue tối ưu hóa việc cập nhật DOM hiệu quả hơn. Khi dữ liệu thay đổi, Vue sử dụng `key` để xác định các phần tử đã được thêm vào, loại bỏ, hoặc sắp xếp lại, thay vì render lại toàn bộ danh sách. Nếu không có `key` hoặc `key` không duy nhất, Vue có thể gặp khó khăn trong việc quản lý trạng thái của các phần tử, dẫn đến các lỗi về hiệu suất hoặc hiển thị không chính xác, đặc biệt là khi dữ liệu trong danh sách thay đổi (ví dụ: thêm, xóa, sắp xếp lại).",
    level: "Trung bình",
    position: "frontend",
    category: "Câu hỏi kỹ thuật",
  },
  {
    _id: "2",
    question: "Sự khác biệt giữa v-if và v-show?",
    answer:
      "`v-if` (điều kiện hiển thị) và `v-show` (điều kiện hiển thị/ẩn) đều dùng để điều khiển việc render của các phần tử trong Vue.js, nhưng chúng hoạt động khác nhau",
    level: "Dễ",
    position: "frontend",
    category: "Câu hỏi kỹ thuật",
  },
  {
    _id: "3",
    question: "Dynamic route matching là gì?",
    answer:
      "Trong các ứng dụng web sử dụng routing, **Dynamic Route Matching** (khớp đường dẫn động) là khả năng định nghĩa các đường dẫn (routes) có chứa các đoạn biến động, cho phép một mẫu đường dẫn duy nhất có thể khớp với nhiều URL khác nhau. Thay vì định nghĩa một route riêng cho mỗi ID hoặc tham số cụ thể, bạn có thể sử dụng các ",
    level: "Trung bình",
    position: "backend",
    category: "Câu hỏi kỹ thuật",
  },
  {
    _id: "4",
    question: "Mục đích của keep-alive tag là gì?",
    answer:
      "Trong Vue.js, `<keep-alive>` là một component được tích hợp sẵn. Mục đích chính của nó là **cache (lưu trữ) các component đã được render động hoặc chuyển đổi giữa các tab**, thay vì phá hủy và tạo lại chúng mỗi khi chúng được chuyển đổi qua lại. Điều này giúp giữ lại trạng thái của component và cải thiện hiệu suất, đặc biệt là khi các component đó có quá trình khởi tạo tốn kém hoặc cần duy trì trạng thái của người dùng (ví dụ: một form đang điền dở, hoặc trạng thái cuộn của một danh sách).\n\nKhi một component được bao bọc bởi `<keep-alive>` và bị ẩn đi (ví dụ: chuyển sang một tab khác), nó sẽ không bị `unmount` (hủy bỏ) mà thay vào đó sẽ được `deactivated` (vô hiệu hóa). Khi component đó được hiển thị lại, nó sẽ được `activated` (kích hoạt) thay vì phải được khởi tạo lại từ đầu. Các lifecycle hooks `activated` và `deactivated` được cung cấp để bạn có thể thực hiện các hành động cụ thể khi component được kích hoạt hoặc vô hiệu hóa.\n\nSử dụng `<keep-alive>` hiệu quả có thể tối ưu hóa trải nghiệm người dùng bằng cách giảm thời gian tải và giữ nguyên dữ liệu trên giao diện.",
    level: "Trung bình",
    position: "frontend",
    category: "Câu hỏi kỹ thuật",
  },
  {
    _id: "5",
    question: "Sự khác nhau giữa stateful component và stateless component?",
    answer:
      "Trong React và các thư viện UI dựa trên component, sự khác biệt giữa Stateful và Stateless Components là một khái niệm cốt lõi:",
    level: "Khó",
    position: "frontend",
    category: "Câu hỏi kỹ thuật",
  },
  {
    _id: "6",
    question: "Redux là gì?",
    answer:
      "Redux là một thư viện quản lý trạng thái (state management library) cho các ứng dụng JavaScript, đặc biệt phổ biến trong các ứng dụng được xây dựng với React. Mục tiêu chính của Redux là cung cấp một kho lưu trữ trạng thái tập trung và có thể dự đoán được (predictable state container) cho toàn bộ ứng dụng.\n\nCác nguyên tắc cốt lõi của Redux:\n\n1.  **Single source of truth (Một nguồn sự thật duy nhất):** Toàn bộ trạng thái của ứng dụng được lưu trữ trong một đối tượng cây duy nhất bên trong một kho lưu trữ (store) duy nhất.\n2.  **State is read-only (Trạng thái chỉ đọc):** Cách duy nhất để thay đổi trạng thái là phát ra một hành động (action) - một đối tượng JavaScript mô tả điều gì đã xảy ra.\n3.  **Changes are made with pure functions (Các thay đổi được thực hiện bằng các hàm thuần khiết):** Để chỉ định cách cây trạng thái được chuyển đổi bởi các hành động, bạn viết các hàm thuần khiết được gọi là reducers.\n\n**Các thành phần chính của Redux:**\n-   **Store:** Là đối tượng chứa toàn bộ trạng thái của ứng dụng. Có duy nhất một store trong mỗi ứng dụng Redux.\n-   **Actions:** Là các đối tượng JavaScript thuần túy mô tả những gì đã xảy ra. Chúng là nguồn thông tin duy nhất gửi dữ liệu từ ứng dụng của bạn đến store.\n-   **Reducers:** Là các hàm thuần khiết nhận trạng thái hiện tại và một action, sau đó trả về một trạng thái mới. Reducers là nơi thực hiện logic để cập nhật trạng thái.\n-   **Dispatch:** Là một phương thức của store dùng để gửi (dispatch) một action. Khi một action được dispatch, nó sẽ đi qua các reducers để cập nhật trạng thái.\n-   **Selector:** Là các hàm dùng để trích xuất (select) các phần cụ thể của trạng thái từ store.\n\n**Lợi ích của Redux:**\n-   **Predictable state:** Trạng thái ứng dụng dễ dàng được theo dõi và gỡ lỗi.\n-   **Centralized state management:** Dễ dàng quản lý trạng thái phức tạp và chia sẻ giữa các component.\n-   **Debugging:** Các công cụ phát triển của Redux giúp theo dõi mọi thay đổi trạng thái và actions đã được gửi.\n-   **Server-side rendering:** Dễ dàng triển khai server-side rendering vì trạng thái có thể được khởi tạo trên server.\n\nRedux thường được sử dụng trong các ứng dụng lớn và phức tạp nơi việc quản lý trạng thái trở nên khó khăn với các giải pháp quản lý trạng thái cục bộ.",
    level: "Trung bình",
    position: "frontend",
    category: "Câu hỏi kỹ thuật",
  },
  {
    _id: "7",
    question: "Sự khác biệt giữa let và var?",
    answer:
      "Trong JavaScript, `var` và `let` đều được dùng để khai báo biến, nhưng chúng có những khác biệt quan trọng về phạm vi (scope) và cách hoạt động:\n\n1.  **Phạm vi (Scope):**\n    -   **`var` (Function Scope):** Biến được khai báo với `var` có phạm vi là toàn bộ hàm (function) chứa nó. Nếu khai báo bên ngoài bất kỳ hàm nào, nó sẽ có phạm vi toàn cục (global scope).\n        ```javascript\n        function exampleVar() {\n            if (true) {\n                var x = 10; // x có thể truy cập được trong toàn bộ hàm exampleVar\n            }\n            console.log(x); // Output: 10\n        }\n        exampleVar();\n        // console.log(x); // Lỗi: x is not defined (nếu gọi bên ngoài hàm)\n        ```\n    -   **`let` (Block Scope):** Biến được khai báo với `let` có phạm vi là khối (block) mà nó được định nghĩa trong đó. Một khối được xác định bởi cặp dấu ngoặc nhọn `{}` (ví dụ: `if` block, `for` loop, `while` loop, hoặc bất kỳ cặp `{}` nào).\n        ```javascript\n        function exampleLet() {\n            if (true) {\n                let y = 20; // y chỉ có thể truy cập được trong khối if này\n            }\n            // console.log(y); // Lỗi: y is not defined\n        }\n        exampleLet();\n        ```\n\n2.  **Hoisting (Nâng lên):**\n    -   **`var`:** Biến được khai báo với `var` được nâng lên (hoisted) lên đầu phạm vi của nó. Điều này có nghĩa là bạn có thể truy cập biến trước khi nó được khai báo, mặc dù giá trị của nó sẽ là `undefined` cho đến khi dòng khai báo thực sự được thực thi.\n        ```javascript\n        console.log(a); // Output: undefined\n        var a = 5;\n        console.log(a); // Output: 5\n        ```\n    -   **`let`:** Biến được khai báo với `let` cũng được hoisting, nhưng chúng không được khởi tạo. Chúng nằm trong một vùng chết tạm thời (Temporal Dead Zone - TDZ) cho đến khi dòng khai báo thực sự được thực thi. Nếu bạn cố gắng truy cập chúng trong TDZ, bạn sẽ nhận được một `ReferenceError`.\n        ```javascript\n        // console.log(b); // Lỗi: Cannot access 'b' before initialization (TDZ)\n        let b = 10;\n        console.log(b); // Output: 10\n        ```\n\n3.  **Khai báo lại (Redeclaration):**\n    -   **`var`:** Bạn có thể khai báo lại một biến `var` trong cùng một phạm vi mà không gây lỗi.\n        ```javascript\n        var z = 1;\n        var z = 2; // Hợp lệ\n        console.log(z); // Output: 2\n        ```\n    -   **`let`:** Bạn không thể khai báo lại một biến `let` trong cùng một phạm vi. Điều này sẽ gây ra lỗi `SyntaxError`.\n        ```javascript\n        let w = 1;\n        // let w = 2; // Lỗi: Identifier 'w' has already been declared\n        ```\n\n**Kết luận:**\n`let` được giới thiệu trong ES6 (ECMAScript 2015) để khắc phục những nhược điểm của `var`, đặc biệt là về phạm vi và tính dễ đoán. Trong hầu hết các trường hợp phát triển JavaScript hiện đại, `let` (và `const` cho các biến không đổi) là lựa chọn ưu tiên hơn `var` để tránh các lỗi tiềm ẩn và làm cho mã dễ đọc, dễ bảo trì hơn.",
    level: "Dễ",
    position: "frontend",
    category: "Câu hỏi kỹ thuật",
  },
  {
    _id: "8",
    question: "Async/await là gì?",
    answer:
      "**`async` và `await`** là các từ khóa được giới thiệu trong ECMAScript 2017 (ES8) để làm cho việc viết mã bất đồng bộ (asynchronous code) trong JavaScript trở nên dễ đọc và dễ quản lý hơn, gần giống với mã đồng bộ (synchronous code). Chúng được xây dựng dựa trên Promises.\n\n**1. `async` keyword:**\n   -   Bạn đặt từ khóa `async` trước một hàm để khai báo rằng hàm đó là một hàm bất đồng bộ.\n   -   Một hàm `async` luôn trả về một Promise. Nếu hàm `async` trả về một giá trị không phải Promise, JavaScript sẽ tự động bọc giá trị đó vào một Promise đã được giải quyết (resolved Promise).\n   -   Điều này cho phép bạn sử dụng `await` bên trong hàm này.\n\n   ```javascript\n   async function fetchData() {\n       // ... code bất đồng bộ\n       return 'Data loaded';\n   }\n\n   fetchData().then(data => console.log(data)); // Output: Data loaded\n   ```\n\n**2. `await` keyword:**\n   -   Bạn chỉ có thể sử dụng từ khóa `await` bên trong một hàm `async`.\n   -   `await` được đặt trước một Promise. Nó sẽ tạm dừng việc thực thi của hàm `async` cho đến khi Promise đó được giải quyết (resolved) hoặc bị từ chối (rejected).\n   -   Khi Promise được giải quyết, `await` sẽ trả về giá trị mà Promise đó đã giải quyết. Nếu Promise bị từ chối, `await` sẽ ném ra một lỗi (error), và bạn có thể bắt lỗi đó bằng khối `try...catch`.\n\n   ```javascript\n   async function getUserData(userId) {\n       try {\n           const response = await fetch(`https://api.example.com/users/${userId}`);\n           if (!response.ok) {\n               throw new Error(`HTTP error! status: ${response.status}`);\n           }\n           const userData = await response.json(); // Chờ Promise response.json() giải quyết\n           return userData;\n       } catch (error) {\n           console.error('Error fetching user data:', error);\n           throw error; // Ném lỗi để hàm gọi có thể xử lý\n       }\n   }\n\n   // Cách sử dụng:\n   getUserData(123)\n       .then(data => console.log('User data:', data))\n       .catch(err => console.error('Failed to get user data:', err));\n\n   // Hoặc trong một hàm async khác:\n   async function displayUserData() {\n       const user = await getUserData(456);\n       console.log('Displaying user:', user);\n   }\n   displayUserData();\n   ```\n\n**Lợi ích của `async/await`:**\n-   **Cú pháp rõ ràng hơn:** Mã bất đồng bộ trông và cảm giác giống mã đồng bộ, giúp dễ đọc và dễ hiểu hơn nhiều so với việc sử dụng chuỗi `.then()` (Promise chaining) phức tạp, đặc biệt là khi có nhiều thao tác bất đồng bộ liên tiếp (callback hell hoặc Promise hell).\n-   **Xử lý lỗi dễ dàng hơn:** Sử dụng `try...catch` truyền thống để bắt lỗi từ các Promise bị từ chối, tương tự như cách bạn xử lý lỗi trong mã đồng bộ.\n-   **Debugging tốt hơn:** Dễ dàng đặt breakpoint và đi qua từng dòng code bất đồng bộ hơn.\n\n`async/await` là một tính năng mạnh mẽ giúp đơn giản hóa đáng kể việc phát triển các ứng dụng JavaScript có nhiều thao tác bất đồng bộ.",
    level: "Khó",
    position: "backend",
    category: "Câu hỏi kỹ thuật",
  },
  {
    _id: "9",
    question: "Mục đích của Event Loop?",
    answer:
      "Event Loop là cơ chế giúp JavaScript xử lý các tác vụ bất đồng bộ. JavaScript là ngôn ngữ đơn luồng, nhưng nhờ Event Loop, nó có thể thực hiện các thao tác không đồng bộ (như fetch data, setTimeout) mà không chặn luồng chính. Nó liên tục kiểm tra Call Stack và Callback Queue. Khi Call Stack trống, nó sẽ đẩy các hàm từ Callback Queue vào Call Stack để thực thi.",
    level: "Khó",
    position: "backend",
    category: "Câu hỏi kỹ thuật",
  },
  {
    _id: "10",
    question: "Closure trong JavaScript là gì?",
    answer:
      "Closure là khả năng của một hàm ghi nhớ và truy cập biến từ phạm vi bên ngoài của nó (lexical environment) ngay cả sau khi phạm vi bên ngoài đó đã kết thúc. Nó giúp tạo ra các hàm riêng tư, duy trì trạng thái, và xây dựng các module.",
    level: "Khó",
    position: "frontend",
    category: "Câu hỏi kỹ thuật",
  },
  {
    _id: "11",
    question: "Thế nào là Agile Software Development?",
    answer:
      "Agile Software Development là một phương pháp phát triển phần mềm lặp đi lặp lại và tăng dần, tập trung vào việc tạo ra phần mềm có giá trị cho khách hàng thông qua sự hợp tác liên tục giữa các thành viên nhóm và khách hàng. Nó ưu tiên các cá nhân và sự tương tác hơn là quy trình và công cụ, phần mềm hoạt động tốt hơn là tài liệu đầy đủ, hợp tác với khách hàng hơn là đàm phán hợp đồng, và thích ứng với thay đổi hơn là tuân thủ kế hoạch.",
    level: "Dễ",
    position: "project_management",
    category: "Câu hỏi kỹ năng mềm",
  },
  {
    _id: "12",
    question: "Bạn xử lý áp lực trong công việc như thế nào?",
    answer:
      "Khi đối mặt với áp lực, tôi thường ưu tiên các nhiệm vụ, chia nhỏ chúng thành các phần nhỏ hơn để dễ quản lý, và tập trung vào một việc tại một thời điểm. Tôi cũng cố gắng giữ thái độ tích cực, tìm kiếm sự hỗ trợ từ đồng nghiệp hoặc quản lý khi cần, và dành thời gian nghỉ ngơi hợp lý để duy trì sự cân bằng.",
    level: "Trung bình",
    position: "general",
    category: "Câu hỏi kỹ năng mềm",
  },
  {
    _id: "13",
    question: "Điểm mạnh của bạn là gì?",
    answer:
      "Điểm mạnh của tôi là khả năng học hỏi nhanh, kỹ năng giải quyết vấn đề tốt, và tinh thần làm việc nhóm cao. Tôi luôn sẵn lòng học hỏi công nghệ mới và tìm cách tiếp cận sáng tạo để giải quyết các thách thức.",
    level: "Dễ",
    position: "general",
    category: "Câu hỏi kỹ năng mềm",
  },
  {
    _id: "14",
    question: "Điểm yếu của bạn là gì?",
    answer:
      "Một điểm yếu mà tôi đang cố gắng cải thiện là đôi khi tôi quá chú trọng vào chi tiết, điều này có thể làm chậm tiến độ tổng thể. Để khắc phục, tôi đang học cách phân bổ thời gian hiệu quả hơn và biết khi nào nên chấp nhận một giải pháp đủ tốt thay vì cố gắng hoàn hảo mọi thứ.",
    level: "Dễ",
    position: "general",
    category: "Câu hỏi kỹ năng mềm",
  },
];

const mockPositions = [
  { _id: "frontend", name: "Frontend Developer" },
  { _id: "backend", name: "Backend Developer" },
  { _id: "project_management", name: "Project Management" },
  { _id: "general", name: "General IT" },
];

const categories = [
  { id: "Câu hỏi kỹ thuật", name: "Câu hỏi kỹ thuật" },
  { id: "Câu hỏi kỹ năng mềm", name: "Câu hỏi kỹ năng mềm" },
  // Thêm các category khác nếu có
];

const InterviewQuestion = () => {
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Câu hỏi kỹ thuật");
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Filter questions by selected category on initial load and category change
    const questionsInCategory = mockQuestions.filter(
      (q) => q.category === selectedCategory
    );
    setFilteredQuestions(questionsInCategory);

    // Set the first question in the selected category as the default active question
    if (questionsInCategory.length > 0) {
      setEditingQuestion(null);
    } else {
      setEditingQuestion(null);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm(""); // Clear search when category changes
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const questionsToFilter = mockQuestions.filter(
      (q) => q.category === selectedCategory
    );

    if (value) {
      const lowercasedValue = value.toLowerCase();
      const searched = questionsToFilter.filter(
        (q) =>
          q.question.toLowerCase().includes(lowercasedValue) ||
          q.answer.toLowerCase().includes(lowercasedValue)
      );
      setFilteredQuestions(searched);
      if (searched.length > 0) {
        setEditingQuestion(searched[0]);
      } else {
        setEditingQuestion(null);
      }
    } else {
      setFilteredQuestions(questionsToFilter);
      if (questionsToFilter.length > 0) {
        setEditingQuestion(questionsToFilter[0]);
      } else {
        setEditingQuestion(null);
      }
    }
  };

  const getQuestionsByCategory = (category) => {
    return mockQuestions.filter((q) => q.category === category);
  };

  const renderQuestionList = (questions) => {
    if (!questions || questions.length === 0) {
      return <p className="text-gray-500 italic">Không có câu hỏi nào.</p>;
    }
    return questions.map((item) => (
      <div
        key={item._id}
        className={`cursor-pointer px-4 py-2 rounded-md hover:bg-gray-700 transition ${
          editingQuestion?._id === item._id ? "bg-blue-600 text-white" : ""
        }`}
        onClick={() => setEditingQuestion(item)}
      >
        {item.question}
      </div>
    ));
  };
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <Header></Header>
      <div className="min-h-screen   font-sans p-6">
        {/* Header imitation */}

        {/* Main content area */}
        <div className="flex flex-col lg:flex-row gap-6 mt-6">
          {/* Left Sidebar - Categories and Question List */}
          <div className="w-full lg:w-1/4  p-4 rounded-lg shadow-lg">
            <div className="text-2xl font-bold mb-4 border-b  pb-2 text-[#1c9eaf]">
              Bộ câu hỏi
            </div>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <div
                    href="#"
                    className={` text-[#1c9eaf] block px-3 py-2 rounded-md text-lg cursor-pointer font-medium transition ${
                      selectedCategory === cat.id
                        ? "bg-[#1c9eaf] text-white"
                        : " hover:bg-[#1c9eaf] hover:text-white"
                    }`}
                    onClick={() => {
                      navigate("#");
                      handleCategoryChange(cat.id);
                    }}
                  >
                    {cat.name} ({getQuestionsByCategory(cat.id).length})
                  </div>
                  {selectedCategory === cat.id && (
                    <div className="pl-4 mt-2 space-y-1">
                      {/* Render sub-questions for the active category */}
                      {getQuestionsByCategory(cat.id)
                        .slice(0, 5)
                        .map((q) => (
                          <div
                            key={q._id}
                            className={`cursor-pointer px-2 py-1 text-sm rounded-md hover:bg-[#1c9eaf] hover:text-white transition ${
                              editingQuestion?._id === q._id
                                ? "text-[#1c9eaf]"
                                : "text-gray-500"
                            }`}
                            onClick={() => setEditingQuestion(q)}
                          >
                            {q.question}
                          </div>
                        ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Middle Section - Question Details & List by Category */}
          <div className="w-full lg:w-2/3 space-y-6">
            <div className=" p-6 rounded-lg shadow-lg">
              <div className="text-xl text-[#1c9eaf] font-bold mb-4 border-b border-[#1c9eaf] pb-2">
                Bộ câu hỏi phỏng vấn kỹ năng lập trình
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-bold text-[#1c9eaf]">
                  {selectedCategory} ({filteredQuestions.length})
                </div>
              </div>

              <div className="space-y-4">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((item) => (
                    <Card
                      key={item._id}
                      className="bg-gray-700 border border-gray-600 text-gray-200"
                      onClick={() => setEditingQuestion(item)}
                      hoverable
                    >
                      <div className="flex items-start">
                        <div
                          className={`w-4 h-4 rounded-full flex-shrink-0 mt-1 mr-3 ${
                            editingQuestion?._id === item._id
                              ? "bg-blue-500"
                              : "bg-gray-500"
                          }`}
                        ></div>
                        <div>
                          <h4 className="text-lg font-semibold text-blue-400 mb-1">
                            {item.question}
                          </h4>
                          <p className="text-sm text-gray-300 line-clamp-3">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-500 italic text-center py-8">
                    Không tìm thấy câu hỏi nào phù hợp với tìm kiếm hoặc bộ lọc.
                  </p>
                )}
              </div>
            </div>

            {editingQuestion && (
              <div className="fixed inset-0 mt-20 bg-black bg-opacity-10 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto">
                <div className="relative max-w-3xl w-full mx-4 max-h-[70vh]  overflow-y-auto">
                  <Card className="bg-gray-800 text-gray-200 border border-gray-700 rounded-lg shadow-lg p-6 relative">
                    <button
                      className="absolute top-3 right-2 p-2 hover:text-white hover:bg-[#1c9eaf] duration-200 rounded"
                      onClick={() => setEditingQuestion(null)}
                    >
                      Đóng
                    </button>

                    <div className="text-2xl mt-4 font-bold mb-4 text-[#1c9eaf]">
                      {editingQuestion.question}
                    </div>

                    <div className="space-y-3">
                      {editingQuestion.answer && (
                        <p className="text-base text-gray-400 whitespace-pre-line">
                          <strong>Đáp án:</strong> {editingQuestion.answer}
                        </p>
                      )}
                      {editingQuestion.level && (
                        <p className="text-sm text-gray-400">
                          <strong>Cấp độ:</strong> {editingQuestion.level}
                        </p>
                      )}
                      {editingQuestion.position && (
                        <p className="text-sm text-gray-400">
                          <strong>Vị trí:</strong>{" "}
                          {mockPositions.find(
                            (p) => p._id === editingQuestion.position
                          )?.name || "N/A"}
                        </p>
                      )}
                      {editingQuestion.category && (
                        <p className="text-sm text-gray-400">
                          <strong>Thể loại:</strong> {editingQuestion.category}
                        </p>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Related Articles / Ads */}
          <div className="w-full lg:w-1/4 space-y-6">
            <div className=" p-4 rounded-lg shadow-lg">
              <div className="text-xl text-[#1c9eaf] font-bold mb-4 border-b border-[#1c9eaf] pb-2">
                Các bài viết hữu ích
              </div>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <a href="#" className="block hover:text-blue-400">
                    7 kinh nghiệm hữu ích khi làm việc với GIT trong dự án
                  </a>
                </li>
                <li>
                  <a href="#" className="block hover:text-blue-400">
                    Bài tập Python từ cơ bản đến nâng cao (có lời giải)
                  </a>
                </li>
                <li>
                  <a href="#" className="block hover:text-blue-400">
                    Những thực phẩm lập trình viên nên và không nên ăn
                  </a>
                </li>
                <li>
                  <a href="#" className="block hover:text-blue-400">
                    KICC HCMC x TOPDEV - Bước đệm nâng tầm sự nghiệp cho nhân
                    tài IT Việt Nam
                  </a>
                </li>
                <li>
                  <a href="#" className="block hover:text-blue-400">
                    8 tips giúp lập trình viên luôn khỏe mạnh
                  </a>
                </li>
              </ul>
              <div className="text-center mt-4">
                <Button
                  type="link"
                  className="text-blue-400 hover:text-blue-300"
                  onClick={() =>
                    alert('Chức năng "Xem thêm" bài viết đang được phát triển!')
                  }
                >
                  Xem thêm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewQuestion;