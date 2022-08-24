const search = new URLSearchParams(window.location.search)
const all_tds = document.querySelectorAll("td")

const PAST = "#38371f"
const FUTURE = "#fff34e";


const update = () => {
    let now = new Date();
    let end = Date.parse("2022-08-"+search.get("end")+"T17:00:00")
    let diff = new Date(Math.max(end - now,0))
    let c_days    = diff.getDate() - 1
    let c_hours   = diff.getHours()
    let c_minutes = diff.getMinutes()
    document.getElementById("c_days"   ).textContent  = c_days
    document.getElementById("c_hours"  ).textContent  = c_hours
    document.getElementById("c_minutes").textContent  = c_minutes
    let be_collecting = false;
    for (const td of all_tds) {
        if (td.textContent == search.get("start")) {
            be_collecting = true;
        }
        if (be_collecting) { 
            td.style.color = "black";
            if (now.getDate() > +td.textContent) {
                // past
                td.style.background = PAST
            } else if (now.getDate() < +td.textContent) {
                // future
                td.style.background = FUTURE
            } else {
                const p = now.getHours()*100 / 24 + now.getMinutes()*100 / (24*60);
                td.style.background = "linear-gradient(to right, "+PAST+" "+p+"%, "+FUTURE+" "+p+"%)"
            }
        }

        if (td.textContent == search.get("end")) {
            break;
        }
    }
}


update()
setInterval(update, 1000 * 15)
