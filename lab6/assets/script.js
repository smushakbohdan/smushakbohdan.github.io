let tab = document.querySelectorAll('.tab');
let tabContent = document.querySelectorAll('.tabContent');
function hideTabsContent(a) {
    for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
        tab[i].classList.remove('whiteborder');
    }
}
function showTabsContent(b) {
    if (tabContent[b].classList.contains('hide')) {
        hideTabsContent(0);
        tab[b].classList.add('whiteborder');
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
}
hideTabsContent(1);
document.getElementById('tabs').addEventListener('click', function(event) {
    let target = event.target;
    if (target.classList.contains('tab')) {
        for (let i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                showTabsContent(i);
                break;
            }
        }
    }
});
function generateBorderRadius() {
    let rtl = document.getElementById('rtl').value;
    let rtr = document.getElementById('rtr').value;
    let rbr = document.getElementById('rbr').value;
    let rbl = document.getElementById('rbl').value;
    document.getElementById('ttl').value = rtl;
    document.getElementById('ttr').value = rtr;
    document.getElementById('tbr').value = rbr;
    document.getElementById('tbl').value = rbl;
    let block = document.getElementById('block1');
    block.style.borderRadius = rtl + 'px ' + rtr + 'px ' + rbr + 'px ' + rbl + 'px';
    let cssCode = `border-radius: ${rtl}px ${rtr}px ${rbr}px ${rbl}px;`;
    document.getElementById('code1').value = cssCode;
}
function generateTextAlign() {
    let align = document.getElementById('alignValue').value;
    let textColor = document.getElementById('textColor1').value;
    let fontSize = document.getElementById('fontSize1').value;
    let bgColor = document.getElementById('bgColor1').value;
    document.getElementById('fontSizeText1').value = fontSize;
    let block = document.getElementById('block2');
    block.style.textAlign = align;
    block.style.color = textColor;
    block.style.fontSize = fontSize + 'px';
    block.style.background = bgColor;
    let cssCode = `text-align: ${align};\ncolor: ${textColor};\nfont-size: ${fontSize}px;\nbackground: ${bgColor};`;
    document.getElementById('code2').value = cssCode;
}
function generateTextDecoration() {
    let line = document.getElementById('decorLine').value;
    let style = document.getElementById('decorStyle').value;
    let color = document.getElementById('decorColor').value;
    let thickness = document.getElementById('decorThickness').value;
    let textColor = document.getElementById('textColor2').value;
    let fontSize = document.getElementById('fontSize2').value;
    let bgColor = document.getElementById('bgColor2').value;
    document.getElementById('decorThicknessText').value = thickness;
    document.getElementById('fontSizeText2').value = fontSize;
    let block = document.getElementById('block3');
    block.style.textDecorationLine = line;
    block.style.textDecorationStyle = style;
    block.style.textDecorationColor = color;
    block.style.textDecorationThickness = thickness + 'px';
    block.style.color = textColor;
    block.style.fontSize = fontSize + 'px';
    block.style.background = bgColor;
    let cssCode = `text-decoration-line: ${line};\ntext-decoration-style: ${style};\ntext-decoration-color: ${color};\ntext-decoration-thickness: ${thickness}px;\ncolor: ${textColor};\nfont-size: ${fontSize}px;\nbackground: ${bgColor};`;
    if (line !== 'none') {
        cssCode += `\n\n/* Або коротко: */\ntext-decoration: ${line} ${style} ${color} ${thickness}px;`;
    }
    document.getElementById('code3').value = cssCode;
}
function copyCode(textareaId) {
    let textarea = document.getElementById(textareaId);
    textarea.select();
    document.execCommand('copy');
    let btn = event.target;
    let originalText = btn.textContent;
    btn.textContent = 'Скопійовано!';
    setTimeout(() => {
        btn.textContent = originalText;
    }, 2000);
}
generateBorderRadius();
generateTextAlign();
generateTextDecoration();