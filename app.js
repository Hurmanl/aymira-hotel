const state = {
  currentView: 'overview',
  theme: 'dark',
  user: {
    name: 'Aymira Yönetim',
    handle: 'aymira',
    role: 'Admin',
    department: 'Yönetim'
  },
  rooms: [],
  tasks: [
    { id: '1', code: 'cleaning', title: '305 numaralı oda temizliği', status: 'in_progress', priority: 'high', assigned_to: 'Kat Hizmetleri', time: '14:30' },
    { id: '2', code: 'technical_service', title: 'Banyo bakım kontrolü', status: 'review', priority: 'high', assigned_to: 'Ahmet Y.', time: '16:00' },
    { id: '3', code: 'administrative', title: 'Günlük operasyon raporunu hazırla', status: 'todo', priority: 'medium', assigned_to: 'Zeynep K.', time: '18:00' },
    { id: '4', code: 'cleaning', title: '203 numaralı oda kontrolü', status: 'todo', priority: 'medium', assigned_to: 'Ayşe M.', time: '19:30' },
    { id: '5', code: 'housekeeping', title: 'Lobi düzenlemesi tamamlandı', status: 'done', priority: 'low', assigned_to: 'Mehmet S.', time: '12:00' }
  ],
  repairs: [
    { id: 'R-1', product: 'Asansör A Blok', type: 'scheduled_maintenance', location: 'Merkez Blok', priority: 'high', status: 'open', reported_by: 'Güvenlik', date: '14 Kas' },
    { id: 'R-2', product: 'Klima Arızası', type: 'breakdown', location: 'Oda 204', priority: 'high', status: 'in_progress', reported_by: 'Housekeeping', date: '15 Kas' },
    { id: 'R-3', product: 'Banyo Musluk Contası', type: 'breakdown', location: 'Oda 108', priority: 'medium', status: 'open', reported_by: 'Ayşe M.', date: '15 Kas' },
    { id: 'R-4', product: 'Kazan Dairesi Periyodik Bakım', type: 'scheduled_maintenance', location: 'Bodrum Kat', priority: 'medium', status: 'resolved', reported_by: 'Teknik Servis', date: '10 Kas' }
  ],
  complaints: [
    { id: 'C-1', guest: 'John Doe', room: '302', contact: '+90 555 123 4567', category: 'technology', title: 'Wi-Fi sürekli kopuyor', status: 'open', date: 'Bugün 09:15' },
    { id: 'C-2', guest: 'Fatma Hanım', room: '205', contact: 'fatma@example.com', category: 'room_service', title: 'Sıcak su geç geliyor', status: 'in_progress', date: 'Dün 21:40' },
    { id: 'C-3', guest: 'Can Yılmaz', room: '112', contact: '+90 532 987 6543', category: 'noise', title: 'Yan odadan yüksek ses', status: 'resolved', date: '13 Kas' }
  ],
  notices: [
    { id: 'N-1', sender: 'Genel Müdür', title: 'Haftalık Koordinasyon Toplantısı', message: 'Tüm departman şefleri saat 15:00\'te toplantı salonunda hazır bulunsun.', expires: '18 saat kaldı' },
    { id: 'N-2', sender: 'Teknik Servis', title: 'Su Kesintisi Uyarısı', message: 'Yarın 04:00 - 05:00 saatleri arasında hidrofor bakımı yapılacaktır.', expires: '11 saat kaldı' },
    { id: 'N-3', sender: 'İnsan Kaynakları', title: 'Sağlık Raporu Yenilemeleri', message: 'Belge geçerliliği dolan personellerin İK ile ivedi iletişime geçmesi rica olunur.', expires: '23 saat kaldı' }
  ],
  lostFound: [
    { id: 'LF-1', type: 'found', item: 'Apple AirPods Pro', location: 'Lobi Dinlenme Alanı', guest: 'Bilinmiyor', status: 'unclaimed', date: 'Bugün 10:20' },
    { id: 'LF-2', type: 'lost', item: 'Siyah Deri Cüzdan', location: 'Restoran', guest: 'Meltem Arslan (+90 533 111 2233)', status: 'owner_found', date: 'Dün 19:00' },
    { id: 'LF-3', type: 'found', item: 'Güneş Gözlüğü (Ray-Ban)', location: 'Havuz Kenarı', guest: 'Oda 404', status: 'returned', date: '14 Kas' }
  ],
  inventory: [
    { id: 'I-1', name: 'Otel Şampuanı 50ml', category: 'Sarf', stock: 32, min: 50, unit: 'adet', alert: true },
    { id: 'I-2', name: 'Banyo Havlusu', category: 'Tekstil', stock: 120, min: 40, unit: 'adet', alert: false },
    { id: 'I-3', name: 'Fön Makinesi Demirbaş', category: 'Demirbaş', stock: 12, min: 5, unit: 'adet', alert: false },
    { id: 'I-4', name: 'Minibar Su 0.5L', category: 'Minibar', stock: 45, min: 80, unit: 'adet', alert: true },
    { id: 'I-5', name: 'Tuvalet Kağıdı (3 Kat)', category: 'Sarf', stock: 210, min: 100, unit: 'rulo', alert: false },
    { id: 'I-6', name: 'LED Ampul E27', category: 'Teknik', stock: 18, min: 20, unit: 'adet', alert: true }
  ],
  activeRoomChecklist: null
};

// --- Generate 84 Rooms (4 Suites, 2 Accessible, 78 Standard) ---
function init84Rooms() {
  const rooms = [];
  let roomCount = 0;
  const statuses = ['available', 'occupied', 'cleaning', 'dirty', 'inspected'];

  for (let floor = 1; floor <= 4; floor++) {
    for (let r = 1; r <= 21; r++) {
      roomCount++;
      const num = `${floor}${r < 10 ? '0' + r : r}`;
      let type = 'Standard';
      if (roomCount <= 4) type = 'Suite';
      else if (roomCount === 5 || roomCount === 6) type = 'Engelli';

      // Pick a realistic status distribution
      let status = 'available';
      if (roomCount % 7 === 0) status = 'dirty';
      else if (roomCount % 5 === 0) status = 'occupied';
      else if (roomCount % 9 === 0) status = 'cleaning';
      else if (roomCount % 11 === 0) status = 'inspected';

      rooms.push({
        id: `room-${num}`,
        number: num,
        type: type,
        floor: floor,
        status: status,
        checklist: [
          { name: 'Havlu sayısı kontrolü (4 adet)', checked: status === 'available' || status === 'inspected', missing: false, broken: false },
          { name: 'Şampuan & duş jeli dolduruldu', checked: status === 'available' || status === 'inspected', missing: false, broken: false },
          { name: 'Tuvalet kağıdı tamam', checked: status === 'available' || status === 'inspected', missing: false, broken: false },
          { name: 'Fön makinesi çalışıyor', checked: true, missing: false, broken: false },
          { name: 'Yatak çarşafları yenilendi', checked: status === 'available', missing: false, broken: false },
          { name: 'Minibar kontrol & tamamlama', checked: true, missing: false, broken: false },
          { name: 'Banyo ve zemin dezenfekte edildi', checked: status === 'available', missing: false, broken: false }
        ]
      });
    }
  }
  state.rooms = rooms;
}

const KEY='aymira-portal-pastel-v1';
try { const saved=JSON.parse(localStorage.getItem(KEY)); if(saved){for(const k of ['rooms','tasks','repairs','complaints','notices','lostFound','inventory']) if(Array.isArray(saved[k])) state[k]=saved[k];} } catch(e){console.warn('Kayıt okunamadı',e)}
if(!state.rooms.length)init84Rooms();
function save(){try{localStorage.setItem(KEY,JSON.stringify(state))}catch(e){toast('Tarayıcı depolaması kullanılamıyor')}}
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>String(Date.now())+'-'+Math.random().toString(36).slice(2,6);
const labels={board:'Görev Panosu',dashboard:'Genel Bakış',schedule:'Günlük Plan',housekeeping:'Kat Hizmetleri',tasks:'Tüm Görevler',repairs:'Teknik Servis',inventory:'Stok & Envanter',complaints:'Misafir Şikâyetleri',notices:'Duyurular',lostFound:'Kayıp Eşya',messages:'Dahili Mesajlar',settings:'Ayarlar'};
const navIconPaths={
 board:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 dashboard:'<rect x="3" y="3" width="7" height="18" rx="1"/><rect x="14" y="3" width="7" height="18" rx="1"/>',
 schedule:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 14h3M14 14h3"/>',
 housekeeping:'<path d="M3 21v-9M21 21V12M3 16h18M5 9V6h14v3M5 9h14a2 2 0 0 1 2 2v5H3v-5a2 2 0 0 1 2-2Z"/>',
 tasks:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="m8 12 3 3 5-6"/>',
 repairs:'<path d="m14 6 4-4 4 4-4 4M6 14l-4 4 4 4 4-4M7 17 17 7M4 4l16 16"/>',
 inventory:'<path d="m12 3 9 5-9 5-9-5 9-5ZM3 8v9l9 5 9-5V8M12 13v9"/>',
 complaints:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
 notices:'<circle cx="12" cy="12" r="9"/><path d="M12 3v9l6 6"/>',
 lostFound:'<circle cx="10.5" cy="10.5" r="7"/><path d="m16 16 5 5"/>',
 messages:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="m3 7 9 7 9-7"/>',
 settings:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1"/>'
};
const icons=Object.fromEntries(Object.entries(navIconPaths).map(([k,p])=>[k,'<svg class="nav-svg" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.9" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+p+'</svg>']));
let view='board',query='',roomFilter='all',inventoryFilter='all';
const $=id=>document.getElementById(id);
function toast(message){const t=$('toast');t.textContent=message;t.style.display='block';clearTimeout(window._toast);window._toast=setTimeout(()=>t.style.display='none',2600)}
function nav(){
 const primary=['board','dashboard','housekeeping','repairs','complaints','inventory','notices','tasks'];
 const extra=['schedule','lostFound','messages','settings'];
 const navButton=k=>'<button type="button" class="nav-link '+(k===view?'active':'')+'" data-nav="'+k+'"><span class="symbol">'+icons[k]+'</span>'+labels[k]+'</button>';
 $('nav').innerHTML=primary.map(navButton).join('')+'<details class="nav-extra" '+(extra.includes(view)?'open':'')+'><summary>＋ Diğer Modüller</summary>'+extra.map(navButton).join('')+'</details>';
 document.querySelectorAll('[data-nav]').forEach(b=>b.onclick=()=>{view=b.dataset.nav;query='';$('search').value='';render()});
}
function toolbar(title,subtitle,button,action){return `<div class="toolbar"><div><h2>${title}</h2><p>${subtitle}</p></div>${button?`<button class="btn" data-add="${action}">＋ ${button}</button>`:''}</div>`}
const statusLabels={todo:'Yapılacak',in_progress:'Devam Ediyor',review:'İncelemede',done:'Tamamlandı',open:'Açık',resolved:'Çözüldü',available:'Müsait',occupied:'Dolu',dirty:'Kirli',cleaning:'Temizleniyor',inspected:'Kontrol Edildi',unclaimed:'Sahibi Bekleniyor',owner_found:'Sahibi Bulundu',returned:'Teslim Edildi'};
const st=s=>statusLabels[s]||s;
const statusBadge=s=>`<span class="status ${esc(s)}">${esc(st(s))}</span>`;
function render(){nav();$('pageTitle').textContent=labels[view];document.body.classList.toggle('board-mode',view==='board');$('pageSubtitle').textContent=view==='board'?'Otel operasyonlarınızı tek ekrandan takip edin':'';$('search').placeholder=view==='board'?'Görevlerde ara...':'Görev, oda, kayıt ara...';const fn={board:renderBoard,dashboard:renderDashboard,schedule:renderSchedule,housekeeping:renderHousekeeping,tasks:renderTasks,repairs:renderRepairs,inventory:renderInventory,complaints:renderComplaints,notices:renderNotices,lostFound:renderLostFound,messages:renderMessages,settings:renderSettings}[view];$('content').innerHTML=fn();document.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>openForm(b.dataset.add));document.querySelectorAll('[data-act]').forEach(b=>b.onclick=()=>act(b.dataset.act,b.dataset.id,b.dataset.value));document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{if(view==='housekeeping')roomFilter=b.dataset.filter;else inventoryFilter=b.dataset.filter;render()});document.querySelectorAll('[data-room]').forEach(b=>b.onclick=()=>roomDialog(b.dataset.room));document.querySelectorAll('[data-task]').forEach(b=>b.onclick=e=>{e.stopPropagation();taskDialog(b.dataset.task)});document.querySelectorAll('.task-card').forEach(card=>{card.ondragstart=e=>e.dataTransfer.setData('text/plain',card.dataset.task);card.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();taskDialog(card.dataset.task)}}});document.querySelectorAll('[data-drop]').forEach(lane=>{lane.ondragover=e=>e.preventDefault();lane.ondrop=e=>{e.preventDefault();const task=state.tasks.find(t=>t.id===e.dataTransfer.getData('text/plain'));if(task){task.status=lane.dataset.drop;save();render();toast('Görev taşındı')}}})}
const match=(...xs)=>xs.some(x=>String(x??'').toLocaleLowerCase('tr').includes(query));
function renderBoard(){
 const lanes=[['todo','Yapılacak','bed'],['in_progress','Devam Ediyor','bell'],['review','Kontrol Bekliyor','shield'],['done','Tamamlandı','check']];
 const icons={
  bed:'<path d="M3 20V8M21 20V8M3 16h18M5 11h14a2 2 0 0 1 2 2v3H3v-3a2 2 0 0 1 2-2ZM6 11V8h12v3"/>',
  calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M8 14h3M14 14h3"/>',
  check:'<circle cx="12" cy="12" r="9"/><path d="m7.5 12 3 3 6-7"/>',
  alert:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17h.01"/>',
  bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  shield:'<path d="m12 2 9 4v6c0 5-3 8-9 10-6-2-9-5-9-10V6zM8 12l3 3 5-6"/>'
 };
 const svg=p=>'<svg viewBox="0 0 24 24" aria-hidden="true">'+icons[p]+'</svg>';
 const count=[state.tasks.length,state.tasks.filter(t=>t.status==='in_progress').length,state.tasks.filter(t=>t.status==='done').length,state.tasks.filter(t=>t.status==='review').length];
 const names=['Toplam Görev','Devam Eden','Tamamlanan','Bekleyen'];
 const symbols=['bed','calendar','check','alert'];
 const summary='<div class="stats board-stats">'+names.map((name,i)=>'<div class="stat"><div class="stat-icon">'+svg(symbols[i])+'</div><div class="stat-copy"><strong>'+String(count[i]).padStart(2,'0')+'</strong><span>'+name+'</span></div><svg class="stat-wave" viewBox="0 0 75 35" aria-hidden="true"><path d="M0 30 C15 27 17 6 33 12 S54 27 75 3"/></svg></div>').join('')+'</div>';
 const categoryNames={administrative:'YÖNETİM',cleaning:'KAT HİZMETLERİ',housekeeping:'KAT HİZMETLERİ',technical_service:'TEKNİK SERVİS',customer_request:'MİSAFİR TALEBİ',other:'DİĞER',spa:'HİZMET / SPA'};
 const clock='<svg class="task-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/></svg>';
 const columns=lanes.map(([key,title,symbol])=>{
  const tasks=state.tasks.filter(t=>t.status===key&&match(t.title,t.assigned_to,t.code));
  return '<section class="lane" data-drop="'+key+'"><div class="lane-head"><span class="lane-symbol" aria-hidden="true">'+svg(symbol)+'</span><span class="lane-title">'+title+'</span><small>'+String(tasks.length).padStart(2,'0')+'</small></div>'+tasks.map(t=>{
    const category=categoryNames[t.code]||String(t.code||'DİĞER').replaceAll('_',' ').toLocaleUpperCase('tr-TR');
    const pr=t.priority==='high'?'Yüksek':t.priority==='medium'?'Orta':'Düşük';
    return '<article class="task-card" draggable="true" data-task="'+esc(t.id)+'" tabindex="0" role="button" aria-label="'+esc(t.title)+' görev detayını aç" title="Öncelik: '+pr+' · Atanan: '+esc(t.assigned_to)+'"><span class="task-category">'+esc(category)+'</span><h3>'+esc(t.title)+'</h3><div class="card-footer"><span class="task-time">'+clock+esc(t.time||'Bugün')+'</span><button class="tiny-btn" type="button" data-task="'+esc(t.id)+'" aria-label="'+esc(t.title)+' detaylar">•••</button></div></article>';
  }).join('')+(tasks.length?'':'<div class="empty">Bu sütunda görev bulunmuyor</div>')+'<button class="lane-add" type="button" data-add="task">＋ &nbsp;Görev Ekle</button></section>';
 }).join('');
 return summary+toolbar('Operasyon Görevleri','Güncel görevlerinizi 4 sütunda inceleyin.').replace('class="toolbar"','class="toolbar board-toolbar"')+'<div class="board">'+columns+'</div>';
}
function renderDashboard(){const occupied=state.rooms.filter(r=>r.status==='occupied').length;return toolbar('Otelin Güncel Durumu','Operasyonlarını tek ekrandan takip et.')+`<div class="stats"><div class="stat"><span>Toplam Oda</span><strong>${state.rooms.length}</strong></div><div class="stat"><span>Dolu Oda</span><strong>${occupied}</strong></div><div class="stat"><span>Açık Görev</span><strong>${state.tasks.filter(t=>t.status!=='done').length}</strong></div><div class="stat"><span>Bekleyen Arıza</span><strong>${state.repairs.filter(t=>t.status!=='resolved').length}</strong></div></div><div class="panel"><h3>Son Görevler</h3>${state.tasks.slice(0,6).map(t=>`<div class="check-row"><span>${esc(t.title)}</span>${statusBadge(t.status)}<button class="tiny-btn" data-task="${esc(t.id)}">Aç</button></div>`).join('')}</div>`}
function renderSchedule(){return toolbar('Günlük Plan','Görevleri saat ve durumlarına göre görüntüle.','Görev Ekle','task')+`<div class="panel">${state.tasks.filter(t=>match(t.title,t.assigned_to,t.time)).slice().sort((a,b)=>(a.time||'').localeCompare(b.time||'')).map(t=>`<div class="check-row"><b>${esc(t.time||'—')}</b><span>${esc(t.title)} <small>• ${esc(t.assigned_to)}</small></span>${statusBadge(t.status)}<button class="tiny-btn" data-task="${esc(t.id)}">Aç</button></div>`).join('')||'<div class="empty">Kayıt yok</div>'}</div>`}
function renderHousekeeping(){const filters=[['all','Tümü'],['available','Müsait'],['occupied','Dolu'],['dirty','Kirli'],['cleaning','Temizleniyor'],['inspected','Kontrol Edildi'],['standard','Standart'],['suite','Suite'],['accessible','Engelli']];const rooms=state.rooms.filter(r=>(roomFilter==='all'||r.status===roomFilter||r.type.toLowerCase()===(roomFilter==='accessible'?'engelli':roomFilter))&&match(r.number,r.type,st(r.status)));return toolbar('84 Oda • Kat Hizmetleri','Odaya tıklayarak temizlik kontrol listesini düzenle.')+`<div class="filters" style="margin-bottom:18px">${filters.map(([k,v])=>`<button class="${roomFilter===k?'active':''}" data-filter="${k}">${v}</button>`).join('')}</div><div class="grid">${rooms.map(r=>`<div class="room ${r.status}" data-room="${esc(r.number)}"><h3>Oda ${esc(r.number)}</h3><small>${esc(r.type)} • ${r.floor}. kat</small><small><b>${esc(st(r.status))}</b></small></div>`).join('')}</div>`}
function table(headers,rows){return `<div class="table-wrap"><table><thead><tr>${headers.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.join('')||`<tr><td colspan="${headers.length}" class="empty">Kayıt bulunamadı</td></tr>`}</tbody></table></div>`}
function renderTasks(){return toolbar('Tüm Görevler','Görevleri yönet, durumlarını güncelle.','Yeni Görev','task')+table(['Görev','Atanan','Öncelik','Durum','İşlem'],state.tasks.filter(t=>match(t.title,t.assigned_to,t.code)).map(t=>`<tr><td><b>${esc(t.title)}</b><br><small>${esc(t.code)}</small></td><td>${esc(t.assigned_to)}</td><td>${esc(t.priority)}</td><td>${statusBadge(t.status)}</td><td><button class="tiny-btn" data-task="${esc(t.id)}">Düzenle</button></td></tr>`))}
function renderRepairs(){return toolbar('Arızalar ve Bakım','Teknik servis talepleri ve bakım kayıtları.','Yeni Arıza','repair')+table(['Arıza','Konum','Öncelik','Durum','Bildiren','İşlem'],state.repairs.filter(r=>match(r.product,r.location,r.reported_by)).map(r=>`<tr><td><b>${esc(r.product)}</b></td><td>${esc(r.location)}</td><td>${esc(r.priority)}</td><td>${statusBadge(r.status)}</td><td>${esc(r.reported_by)}</td><td>${r.status!=='resolved'?`<button class="tiny-btn" data-act="resolveRepair" data-id="${esc(r.id)}">Çözüldü</button>`:'✓'}</td></tr>`))}
function renderInventory(){return toolbar('Stok & Envanter','Kritik stokları ve malzeme kayıtlarını takip et.','Yeni Malzeme','inventory')+table(['Ürün','Kategori','Stok','Minimum','Durum','İşlem'],state.inventory.filter(r=>match(r.name,r.category)).map(r=>`<tr><td><b>${esc(r.name)}</b></td><td>${esc(r.category)}</td><td>${r.stock} ${esc(r.unit)}</td><td>${r.min}</td><td>${r.stock<r.min?statusBadge('open'):statusBadge('done')}</td><td><button class="tiny-btn" data-act="restock" data-id="${esc(r.id)}">Stok Ekle</button></td></tr>`))}
function renderComplaints(){return toolbar('Misafir Şikâyetleri','Misafir geri bildirimlerini takip et.','Yeni Şikâyet','complaint')+table(['Misafir','Oda','Şikâyet','Kategori','Durum','İşlem'],state.complaints.filter(r=>match(r.guest,r.room,r.title)).map(r=>`<tr><td>${esc(r.guest)}</td><td>${esc(r.room)}</td><td><b>${esc(r.title)}</b></td><td>${esc(r.category)}</td><td>${statusBadge(r.status)}</td><td>${r.status!=='resolved'?`<button class="tiny-btn" data-act="resolveComplaint" data-id="${esc(r.id)}">Çözüldü</button>`:'✓'}</td></tr>`))}
function renderNotices(){return toolbar('Duyuru Panosu','Otel içi bilgilendirmeler ve duyurular.','Yeni Duyuru','notice')+`<div class="grid">${state.notices.filter(n=>match(n.title,n.message,n.sender)).map(n=>`<article class="notice"><small>${esc(n.sender)} • ${esc(n.expires)}</small><h3>${esc(n.title)}</h3><p>${esc(n.message)}</p></article>`).join('')}</div>`}
function renderLostFound(){return toolbar('Kayıp & Bulunan Eşya','Eşya kayıtlarını ve teslim durumlarını yönet.','Yeni Kayıt','lost')+table(['Eşya','Konum','Misafir','Tür','Durum','İşlem'],state.lostFound.filter(r=>match(r.item,r.location,r.guest)).map(r=>`<tr><td><b>${esc(r.item)}</b></td><td>${esc(r.location)}</td><td>${esc(r.guest)}</td><td>${r.type==='found'?'Bulundu':'Kayıp'}</td><td>${statusBadge(r.status)}</td><td>${r.status!=='returned'?`<button class="tiny-btn" data-act="return" data-id="${esc(r.id)}">Teslim Et</button>`:'✓'}</td></tr>`))}
function renderMessages(){return toolbar('Dahili Mesajlar','Bu sürümde mesajlar yalnızca bu tarayıcıda saklanır.')+`<div class="panel"><div id="messagesList">${(JSON.parse(localStorage.getItem('aymira-messages')||'[]')).map(m=>`<div class="check-row"><span>${esc(m.text)}</span><small>${esc(m.date)}</small></div>`).join('')||'<div class="empty">Henüz mesaj yok</div>'}</div><form id="messageForm" style="display:flex;gap:10px;margin-top:15px"><input class="select" name="message" required placeholder="Mesaj yaz..." style="flex:1"><button class="btn">Gönder</button></form></div>`}
function renderSettings(){return toolbar('Ayarlar','Yerel demo verilerini yönet.')+`<div class="panel"><h3>Veri saklama</h3><p>Bu sürümde bilgiler yalnızca bu tarayıcıda saklanır. Başka cihazlara otomatik aktarılmaz.</p><button class="btn secondary" data-act="export">JSON Yedek İndir</button> <button class="btn danger" data-act="reset">Örnek Verilere Dön</button></div>`}
function openModal(title,body){$('modalTitle').textContent=title;$('modalBody').innerHTML=body;$('modal').classList.remove('hidden')}
function closeModal(){$('modal').classList.add('hidden')}
function field(label,name,type='text',value='',options){return `<label class="field">${label}${options?`<select name="${name}" required>${options.map(([k,v])=>`<option value="${esc(k)}" ${k===value?'selected':''}>${v}</option>`).join('')}</select>`:type==='textarea'?`<textarea name="${name}" required>${esc(value)}</textarea>`:`<input name="${name}" type="${type}" value="${esc(value)}" required>`}</label>`}
const priorityOptions=[['low','Düşük'],['medium','Orta'],['high','Yüksek']];
function openForm(type){const forms={task:['Yeni Görev',field('Görev adı','title')+field('Atanan personel','assigned_to')+field('Kategori','code','text','administrative')+field('Öncelik','priority','text','medium',priorityOptions)+field('Saat','time','time','12:00')],repair:['Yeni Arıza',field('Arıza / Ürün','product')+field('Konum','location')+field('Bildiren','reported_by')+field('Öncelik','priority','text','medium',priorityOptions)],inventory:['Yeni Malzeme',field('Malzeme adı','name')+field('Kategori','category')+field('Stok miktarı','stock','number','0')+field('Minimum stok','min','number','10')+field('Birim','unit','text','adet')],complaint:['Yeni Şikâyet',field('Misafir adı','guest')+field('Oda','room')+field('Şikâyet','title')+field('İletişim','contact')+field('Kategori','category','text','room_service')],notice:['Yeni Duyuru',field('Başlık','title')+field('Gönderen','sender','text','Yönetim')+field('Açıklama','message','textarea')],lost:['Yeni Eşya Kaydı',field('Eşya','item')+field('Konum','location')+field('Misafir','guest','text','Bilinmiyor')+field('Tür','type','text','found',[['found','Bulundu'],['lost','Kayıp']])]} ;const [title,fields]=forms[type];openModal(title,`<form id="createForm">${fields}<div class="form-actions"><button type="button" class="btn secondary" id="cancelForm">Vazgeç</button><button class="btn">Kaydet</button></div></form>`);$('cancelForm').onclick=closeModal;$('createForm').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));if(type==='task')state.tasks.unshift({id:uid(),status:'todo',...d});if(type==='repair')state.repairs.unshift({id:uid(),type:'breakdown',status:'open',date:new Date().toLocaleDateString('tr-TR'),...d});if(type==='inventory')state.inventory.unshift({id:uid(),...d,stock:Number(d.stock),min:Number(d.min)});if(type==='complaint')state.complaints.unshift({id:uid(),status:'open',date:new Date().toLocaleDateString('tr-TR'),...d});if(type==='notice')state.notices.unshift({id:uid(),expires:'Yeni',...d});if(type==='lost')state.lostFound.unshift({id:uid(),status:'unclaimed',date:new Date().toLocaleDateString('tr-TR'),...d});save();closeModal();render();toast('Kayıt eklendi')}}
function taskDialog(id){const t=state.tasks.find(t=>t.id===id);if(!t)return;openModal('Görev Detayı',`<form id="editTask">${field('Görev','title','text',t.title)}${field('Atanan','assigned_to','text',t.assigned_to)}${field('Öncelik','priority','text',t.priority,priorityOptions)}${field('Durum','status','text',t.status,[['todo','Yapılacak'],['in_progress','Devam Ediyor'],['review','İncelemede'],['done','Tamamlandı']])}<div class="form-actions"><button type="button" class="btn danger" id="deleteTask">Sil</button><button class="btn">Kaydet</button></div></form>`);$('editTask').onsubmit=e=>{e.preventDefault();Object.assign(t,Object.fromEntries(new FormData(e.target)));save();closeModal();render();toast('Görev güncellendi')};$('deleteTask').onclick=()=>{if(confirm('Görev silinsin mi?')){state.tasks=state.tasks.filter(x=>x.id!==id);save();closeModal();render()}}}
function roomDialog(number){const r=state.rooms.find(r=>r.number===number);if(!r)return;openModal(`Oda ${number} • Kontrol Listesi`,`<form id="roomForm">${field('Oda durumu','status','text',r.status,[['available','Müsait'],['occupied','Dolu'],['dirty','Kirli'],['cleaning','Temizleniyor'],['inspected','Kontrol Edildi']])}<h3>Temizlik kontrolü</h3>${r.checklist.map((item,i)=>`<div class="check-row"><input type="checkbox" name="checked-${i}" ${item.checked?'checked':''}><span>${esc(item.name)}</span><label><input type="checkbox" name="missing-${i}" ${item.missing?'checked':''}> Eksik</label><label><input type="checkbox" name="broken-${i}" ${item.broken?'checked':''}> Hasarlı</label></div>`).join('')}<div class="form-actions"><button class="btn">Kontrolü Kaydet</button></div></form>`);$('roomForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);r.status=f.get('status');r.checklist.forEach((item,i)=>{const wasBroken=item.broken;item.checked=f.has('checked-'+i);item.missing=f.has('missing-'+i);item.broken=f.has('broken-'+i);if(item.broken&&!wasBroken)state.repairs.unshift({id:uid(),product:item.name,type:'breakdown',location:'Oda '+number,priority:'high',status:'open',reported_by:'Kat Hizmetleri',date:'Yeni'})});save();closeModal();render();toast('Oda kaydedildi; yeni hasarlar arızalara eklendi')}}
function act(action,id){if(action==='export'){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='aymira-yedek.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);return}if(action==='reset'){if(confirm('Tüm yerel değişiklikler silinsin mi?')){localStorage.removeItem(KEY);location.reload()}return}const collections={resolveRepair:'repairs',resolveComplaint:'complaints',return:'lostFound',restock:'inventory'};const item=state[collections[action]]?.find(x=>x.id===id);if(!item)return;if(action==='restock'){const n=Number(prompt('Eklenecek stok miktarı:',10));if(!Number.isFinite(n)||n<=0)return;item.stock+=n}else item.status=action==='return'?'returned':'resolved';save();render();toast('Kayıt güncellendi')}
$('headerCreate').onclick=()=>openForm('task');$('search').oninput=e=>{query=e.target.value.trim().toLocaleLowerCase('tr');render()};$('closeModal').onclick=closeModal;$('modal').onclick=e=>{if(e.target===$('modal'))closeModal()};$('theme').onclick=()=>{document.body.classList.toggle('dark');localStorage.setItem('aymira-theme',document.body.classList.contains('dark')?'dark':'light')};$('notifyBtn').onclick=()=>toast(`Açık görev: ${state.tasks.filter(t=>t.status!=='done').length} • Bekleyen arıza: ${state.repairs.filter(r=>r.status!=='resolved').length}`);$('today').textContent=new Date().toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'});if(localStorage.getItem('aymira-theme')==='dark')document.body.classList.add('dark');document.addEventListener('submit',e=>{if(e.target.id==='messageForm'){e.preventDefault();const input=e.target.elements.message;const messages=JSON.parse(localStorage.getItem('aymira-messages')||'[]');messages.push({text:input.value,date:new Date().toLocaleString('tr-TR')});localStorage.setItem('aymira-messages',JSON.stringify(messages));render();toast('Mesaj yerel olarak kaydedildi')}});render();