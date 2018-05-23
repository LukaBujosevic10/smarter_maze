'use strict'
$(document).ready(function() {
 let wrap = $('#wrap');
 let put;
 let zid;
 var program_maze = new Array();
 let deca;
 let moguca_mesta = new Array();
 moguca_mesta[0] = new Array();
 moguca_mesta[1] = new Array();
 let brojac_rednog_broja = 0;
 let vrednosti_mog_mesta = new Array;
 var vod_kruga;
 var usp_kruga;
 var vred_kruga;
 var rb_divica;
 var vred_na_novom_mestu = -1;
 let drugi_wrap = $('#drugi_wrap');
 let clanovi_drugog_wrapa;
  function pravljenje_lavirinta() {

    let x;
    // prevljenje lavirinta
    for(var i = 0; i < 400; i++){
      x = Math.floor((Math.random() * 3) + 1);
      if(i == 0 | i == 399){
        $(wrap).append('<div class="put"></div>')
      }else{
        if(x == 1){
          $(wrap).append('<div class="zid"></div>')
        }else{
          $(wrap).append('<div class="put"></div>')
        }
      }

    }
    put = $('.put');
    zid = $('.zid')
    pravljenje_visedimenzionalnog_niza();
  }
  pravljenje_lavirinta();

  function pravljenje_kruga_i_kraja() {
    $(put[0]).append('<div id="krug"></div>');
    $(put[put.length - 1]).append('<div id="kraj"></div>');
    pronalazenje_mogucih_pozicija();
  }
  function pravljenje_visedimenzionalnog_niza() {
    let brojac = 0;
    let klasa;
    deca = $(wrap).children()
     for (var i = 0; i < 20; i++) {
       program_maze[i] = new Array();
       for (var x = 0; x < 20; x++) {
         klasa = $(deca[brojac]).attr('class');
         if (klasa == "zid") {

           program_maze[i][x] = 'x';
         }else {
           program_maze[i][x] = 0;
         }
         brojac++;
       }
       program_maze[0][0] = -1;
     }
     //console.log("veliki niz je");
     //console.log(program_maze);
     pravljenje_kruga_i_kraja();
     pravljenje_drugog_kvadrata();
  }

  function pronalazenje_mogucih_pozicija() {
    for (var i = 0; i < 20; i++) {
      if (program_maze[i].indexOf(vred_na_novom_mestu) != -1) {
        usp_kruga = (program_maze[i].indexOf(vred_na_novom_mestu));
        vod_kruga = i;
        //console.log(`uspravna je ${usp_kruga} a vod kruga je ${vod_kruga}`);
        vred_kruga = program_maze[vod_kruga][usp_kruga];
        //console.log(vred_kruga+" je vrednost kruga");
      }
    }
    // provera polja GORE
    if (vod_kruga - 1 >= 0) {
      if (program_maze[vod_kruga - 1][usp_kruga] != 'x') {
        moguca_mesta[0][brojac_rednog_broja] = vod_kruga - 1;
        moguca_mesta[1][brojac_rednog_broja] = usp_kruga;
        //console.log("Može GORE");
        brojac_rednog_broja++;
      }
    }
    // kraj provere polja GORE

    // provera polja ispod
    if (vod_kruga + 1 <= 19) {
        if (program_maze[vod_kruga + 1][usp_kruga] != 'x') {
        moguca_mesta[0][brojac_rednog_broja] = vod_kruga + 1;
        moguca_mesta[1][brojac_rednog_broja] = usp_kruga;
        //console.log("Može DOLE");
        brojac_rednog_broja++;
        }
    }
    //kraj provere polja ispod

    //provera da li moze levo
    if (usp_kruga - 1 >= 0) {
      if (program_maze[vod_kruga][usp_kruga - 1] != 'x') {
      //  console.log('Moze levo');
        moguca_mesta[0][brojac_rednog_broja] = vod_kruga;
        moguca_mesta[1][brojac_rednog_broja] = usp_kruga-1;
        brojac_rednog_broja++;
      }
    }
    //kraj provere da li moze levo

    //provera da li moze desno
    if (usp_kruga + 1 <= 19) {
      if (program_maze[vod_kruga][usp_kruga + 1] != 'x') {
      //  console.log('moze desno');
        moguca_mesta[0][brojac_rednog_broja] = vod_kruga;
        moguca_mesta[1][brojac_rednog_broja] = usp_kruga+1;
        brojac_rednog_broja++;
      }
    }
    // kraj provere da li mozee desno
    brojac_rednog_broja = 0;

    //console.log("niz MOGUĆA MESTA");

    //console.log(moguca_mesta);


    pomeranje_kruga();
    }
    function pomeranje_kruga() {
    //  console.log("--------------------------------");
      for (var i = 0; i < moguca_mesta[0].length; i++) {
        let k1 = moguca_mesta[0][i];
        let k2 = moguca_mesta[1][i];
        //console.log("moguće pozicije  "+k1 + "  i  " + k2);
        let vred = program_maze[k1][k2];
        //console.log("Vrednost mogućeg mesta je "+ vred);
        vrednosti_mog_mesta[i] = vred;
      }
      //console.log("Niz vrednosti mog mesta");

      vrednosti_mog_mesta.sort();
      //console.log("sortiran niz");
      //console.log(vrednosti_mog_mesta);
      let najm_vred = vrednosti_mog_mesta[0];

      for (var i = 0; i < moguca_mesta[0].length; i++) {
        let k1 = moguca_mesta[0][i];
        let k2 = moguca_mesta[1][i];
              if (program_maze[k1][k2] == najm_vred) {
                //console.log(`idi na ovo mesto, koord su ${k1} i ${k2}`);
                //  uvećavanje vrednosti na novom mestu i prebacivanje u negativnu

                vred_na_novom_mestu = (program_maze[k1][k2] +1) * (-1);
                program_maze[k1][k2] = vred_na_novom_mestu;
                // vraćenje vrednosti namestu kruga u pozitivnu
                program_maze[vod_kruga][usp_kruga] = vred_kruga * (-1);
                //console.log(program_maze);
                break;
              }
      }
      trazenje_divica();
      var svi_divici = $(wrap).children();
      //console.log(`redni broj divića je ${rb_divica}`);
      $("#krug").offset($(svi_divici[rb_divica-1]).offset())
//      moguca_mesta.length=0;
        moguca_mesta[0].length=0;
        moguca_mesta[1].length=0;
        vrednosti_mog_mesta.length=0;
        //console.log(moguca_mesta.length+" je dužina niza mog mesta ");
        clanovi_drugog_wrapa = $(drugi_wrap).children();
        provera_mesta();
        ispis_drugog_wrapa();
    }
    function trazenje_divica() {
          for (var hor = 0; hor < 20; hor++) {
                for (var ver = 0; ver < 20; ver++) {
                  //console.log("tražim divić");
                        if (program_maze[hor][ver]<0) {
                          rb_divica = hor*20 + ver+1;
                          //console.log(`redni broj divića je ${rb_divica}`);
                          break;
                        }
                }
          }
    }
let loop = setInterval(pronalazenje_mogucih_pozicija,20);

function pravljenje_drugog_kvadrata() {
  for (var i = 0; i < 20; i++) {
    for (var x = 0; x < 20; x++) {
      if (program_maze[i][x] == 'x') {
        $(drugi_wrap).append('<div class = "zid"></div>');
      }else {
        $(drugi_wrap).append('<div class = "put"></div>');
      }
    }
  }

}
function ispis_drugog_wrapa() {
  //console.log(clanovi_drugog_wrapa);
  for (var i = 0; i < 20; i++) {
    for (var x = 0; x < 20; x++) {
      if (program_maze[i][x] != 'x') {
        let racunica = i * 20 + x;
        //console.log("U ifu sam");
      $(clanovi_drugog_wrapa[racunica]).text(program_maze[i][x]);
      }
    }
  }

}
function provera_mesta() {
  let mesto_krugica = $(krug).offset();
  let mesto_kraja = $('#kraj').offset();
  if (mesto_krugica.top == mesto_kraja.top) {
    if (mesto_krugica.left == mesto_kraja.left) {
      clearInterval(loop);
    }
  }
}
});
