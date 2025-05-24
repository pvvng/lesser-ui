import SnippetStudio from "@/components/snippet-studio";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ElementDetail() {
  const test_html = `<input type="checkbox" id="checkboxInput">
<label for="checkboxInput" class="toggleSwitch"></label>`;

  const test_css = `#checkboxInput { display: none; }
.toggleSwitch {
  width: 50px;
  height: 30px;
  background: #444;
  border-radius: 15px;
  position: relative;
  display: block;
  cursor: pointer;
}
.toggleSwitch::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  transition: transform 0.2s ease;
}
#checkboxInput:checked + .toggleSwitch::after {
  transform: translateX(20px);
}
#checkboxInput:checked + .toggleSwitch {
  background: #7c3aed;
}
`;

  return (
    <div>
      <div className="mt-5 p-5">
        <SnippetStudio userHtml={test_html} userCss={test_css} />
      </div>
    </div>
  );
}
