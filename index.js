// PS｜使用go("https://...")跳转链接
const print=(text)=>console.log(text) // Python(bushi)
const find=(ee)=>document.querySelectorAll(ee)
const create=(ee)=>document.createElement(ee)
const toggle=(ee)=>{
    ee.firstChild.classList.toggle("rotate")
    find("[data-key='"+ee.textContent+"']").forEach((div)=>div.classList.toggle("toggle"))
}
const change=(ee)=>{
    if (ee==undefined) return change(find("#nav .btn")[0])
    find("#nav .btn").forEach((btn)=>btn.classList.remove("active"))
    ee.classList.add("active")
    ee.click()
    back(find("#search-reason")[0],find(":target")[0])
}
const back=(from,to)=>{
    from.classList.remove("show")
    to.classList.remove("hide")
    find("#head h2")[0].textContent=to.id
    find(".active")[0].classList.remove("transparent")
}
const push=()=>{
    const nav=find("#nav")[0]
    const uwu=find("#main-uwu")[0]
    Object.keys(servers).forEach((key)=>{
        nav.innerHTML+="<p><i class='fas fa-angle-down'></i>"+key+"</p>"
        Object.keys(servers[key]).forEach((key_)=>{
            const a=create("a")
            a.href="#"+key_+" "+key
            a.dataset.key=key
            a.classList.add("btn")
            a.innerHTML+="<i class='fas fa-location-arrow'></i><span>"+key_+"</span>"
            nav.appendChild(a)
            const div_=create("div")
            div_.id=key_+" "+key
            div_.classList.add("products")
            const keys=servers[key][key_]
            Object.keys(keys).forEach((key__)=>{
                const div__=create("div")
                div__.classList.add("product")
                div__.innerHTML+="<h3 class='title'><i class='fas fa-server'></i><span>"+key__+"</span></h3>"
                const ul=create("ul")
                ul.classList.add("features")
                const list=keys[key__]["配置"].split("//")
                list.forEach((li)=>ul.innerHTML+="<li class='feature'><i class='fas fa-check-circle'></i><span>"+li+"</span></li>")
                div__.appendChild(ul)
                const price=[...keys[key__]["定价"].split("//"),"仅供参考","无"]
                div__.innerHTML+="<div class='price'><span>"+(price[0]||"非卖品")+"</span><s><b>"+price[1]+"</b></s>／"+price[2]+"</div><div class='btn3' data-p0='"+key+"' data-p1='"+key_+"' data-p2='"+key__+"'><i class='fas fa-shopping-cart'></i><span>立即购买</span></div>"
                const label=keys[key__]["标签"].split("//")
                if (label[0]) {
                    const label_=create("div")
                    label_.classList.add("label")
                    label.length>1?label_.classList.add(label[1]):null
                    label_.textContent=label[0]
                    div__.appendChild(label_)
                }
                div_.appendChild(div__)
            })
            uwu.appendChild(div_)
        })
    })
}
const search=(ee)=>{
    const text=ee.value.toLowerCase()
    const reason=find("#search-reason")[0]
    if (!text) return back(reason,find(":target")[0])
    reason.innerHTML=""
    reason.classList.add("show")
    find(":target")[0].classList.add("hide")
    find(".product").forEach((ee)=>ee.firstChild.textContent.toLowerCase().includes(text)?reason.appendChild(ee.cloneNode(true)):null)
    find("#search-reason .product .btn3").forEach((ee)=>ee.addEventListener("click",function () {confirm(this)}))
    find(".active")[0].classList.add("transparent")
    find("#head h2")[0].textContent="搜索："+text+"（"+reason.children.length+"）"
}
const confirm=(ee)=>{
    const server=servers[ee.dataset.p0][ee.dataset.p1][ee.dataset.p2]
    const price=[...server["定价"].split("//"),"仅供参考","无"]
    find("#window")[0].innerHTML="<p><b>"+ee.dataset.p2+"</b></p><p id='price'>"+(price[0]||"非卖品")+"／"+price[2]+"</p><p>"+server["配置"].replace(/\/\//g,"<i> ｜ </i>")+"</p>"
    find("#flow-box")[0].style.display="block"
    find("#btns2 .btn3")[0].title=server["跳转"]
}
const go=(to)=>{
    const ee=create("a")
    ee.href=to
    ee.target="_blank"
    ee.rel="noopener noreferrer"
    ee.click()
}
window.onload=()=>{
    push()
    change(find("[href='"+decodeURIComponent(window.location.hash)+"']")[0])
    find("#nav .btn").forEach((btn)=>btn.addEventListener("click",function () {change(this)}))
    find("#nav p").forEach((p)=>p.addEventListener("click",function () {toggle(this)}))
    find(".product .btn3").forEach((btn)=>btn.addEventListener("click",function () {confirm(this)}))
    find("#close")[0].addEventListener("click",()=>find("#flow-box")[0].style.display="none")
    find("#btns2 .btn2")[0].addEventListener("click",()=>find("#flow-box")[0].style.display="none")
    find("#btns2 .btn3")[0].addEventListener("click",function () {go(this.title)})
    find("#search-box input")[0].addEventListener("input",function () {search(this)})
    find("#search-box input")[0].addEventListener("click",function () {search(this)})
}