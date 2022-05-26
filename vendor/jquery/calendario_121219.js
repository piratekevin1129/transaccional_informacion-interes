var meses = [31,28,31,30,31,30,31,31,30,31,30,31]
var meses_names = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
var semana = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'] //Array con los dias de la semana (por si acaso)
var actual_idname = ''

var calendars_data = []

function getRand(min,max){
    var num = Math.floor(Math.random()*(max-min+1))+min
    return num
}

function setCalendario(data){
	var value_str = ""
	var value_arr = ""
	var mes_str = -1
	var ano_str = 0
	var dia_selected = 0

	var mes = -1
	var ano = 0
	var dia = 1
	
	var padre = null
	var div_calendario = document.createElement('div')
	var tipo_calendario = ''

	if(data.div!=null&&data.div!=undefined){
		var input_div = document.getElementById(data.idname)
		tipo_calendario = 'div'
		value_str = input_div.getAttribute('value')
		if(value_str==""){
			value_str = new Date().getUTCDate()+'/'+(new Date().getUTCMonth()+1)+'/'+new Date().getUTCFullYear()
			input_div.setAttribute('value',value_str)
		}
		value_arr = value_str.split("/")
		mes_str = Number(value_arr[1])
		ano_str = Number(value_arr[2])
		dia_selected = Number(value_arr[1])

		mes = (mes_str-1)
		ano = ano_str
		dia = 1

		padre = input_div
		div_calendario.className = 'arl_calendario arl_calendario_on arl_calendario_div'
		div_calendario.setAttribute('status','on')
		div_calendario
	}else{
		var input_text = document.getElementById(data.idname)
		tipo_calendario = 'input'
		input_text.setAttribute('onfocus','openCalendario("'+data.idname+'")')
		//input_text.setAttribute('onblur','closeCalendario("'+data.idname+'")')
		value_str = input_text.value
		if(value_str==""){
			value_str = new Date().getUTCDate()+'/'+(new Date().getUTCMonth()+1)+'/'+new Date().getUTCFullYear()
			input_text.value = value_str
		}
		value_arr = value_str.split("/")
		mes_str = Number(value_arr[1])
		ano_str = Number(value_arr[2])
		dia_selected = Number(value_arr[1])

		mes = (mes_str-1)
		ano = ano_str
		dia = 1
		
		padre = input_text.parentNode
		div_calendario.className = 'arl_calendario arl_calendario_off'
		div_calendario.setAttribute('status','off')
	}

	var buttons = data.buttons
	if(buttons==null||buttons==undefined){
		buttons = true
	}
	var data_dias = null
	if(data.dias==null||data.dias==undefined){
		data_dias = 'all'
	}else{
		data_dias = data.dias
	}
	calendars_data.push({
		idname:data.idname,
		calendario_id:'arl_calendario_id_'+data.idname,
		dias_clickeables:data_dias,
		type:tipo_calendario,
		botones:buttons
	})

	div_calendario.id = 'arl_calendario_id_'+data.idname

	if(data.width!=undefined&&data.width!=null){
		//ancho personalizado
		div_calendario.style.width = data.width
	}

	//comprobar si el render es necesario o no
	padre.appendChild(div_calendario)
	if(data.render!=null&&data.render!=undefined){
		//renderizar calendario
		if(render){
			printCalendario({ano:ano,mes:mes,idname:data.idname})
		}
	}else{
		//no es necesario
		printCalendario({ano:ano,mes:mes,idname:data.idname})
	}
}

function setCalendarioDate(idname,fecha){
	var element = document.getElementById(idname)
	var tag = element.tagName
	if(tag=='INPUT'){
		element.value = fecha
	}else{
		element.setAttribute('value',fecha)
	}
}

function hideCalendario(idname){
	var div_calendario = document.getElementById('arl_calendario_id_'+idname)
	div_calendario.style.display = 'none'
}
function showCalendario(idname){
	var div_calendario = document.getElementById('arl_calendario_id_'+idname)
	div_calendario.style.display = 'block'
}

function printCalendario(data){
	var ano = data.ano
	var mes = data.mes
	var idname = data.idname
	var ano_disponible_data = data.ano_disponible_data
	var mes_disponible_data = data.mes_disponible_data
	var days_disponibles_data = data.days_disponibles_data
	var clicked = data.clicked
	var range = data.range


	//get fecha del input
	var input_text = document.getElementById(idname)
	var value_str = ""
	if(input_text.value!=undefined){
		//es input
		value_str = input_text.value
	}else{
		//es div
		value_str = input_text.getAttribute('value')
	}
	
	var value_arr = value_str.split("/")
	var clickeado = true
	if(clicked!=null&&clicked!=undefined){
		clickeado = clicked
	}
	var dia_clickeado = Number(value_arr[0])
	var mes_clickeado = Number(value_arr[1])
	var ano_clickeado = Number(value_arr[2])

	if(mes==null||mes==undefined){
		mes = mes_clickeado-1
	}
	if(ano==null||ano==undefined){
		ano = ano_clickeado
	}
	
	var total_dias = meses[mes]
	if(ano%4==0){
		//bisiesto
		total_dias = 29
	}

	//mes dias disponibles
	//dias disponibles
	var p = -1
	for(var c = 0;c<calendars_data.length;c++){
		if(calendars_data[c].idname==idname){
			p = c
		}
	}
	
	var disponibles = calendars_data[p].dias_clickeables
	var botones = calendars_data[p].botones
	var rangos = []
	if(range!=null&&range!=undefined){
		rangos = range
	}

	//accion click
	var accion = input_text.getAttribute('accion')
	if(accion==""){
		accion = 'selectDate'
	}

	var html = ""
	html+='<div class="arl_calendario_head">'
		html+='<div class="arl_calendario_mes">'
			html+='<p>'
				html+='<span class="arl_calendario_mes_txt" value="'+mes+'">'+meses_names[mes]+'</span> <span class="arl_calendario_ano_txt" value="'+ano+'">'+ano+'</span>'
			html+='</p>'
		html+='</div>'
		if(botones){
			html+='<div class="arl_calendario_prev_btn" onclick="clickMesPrev('+"'"+idname+"'"+')"></div>'
			html+='<div class="arl_calendario_next_btn" onclick="clickMesNext('+"'"+idname+"'"+')"></div>'	
		}
	html+='</div>'
	html+='<div class="arl_calendario_body">'
		html+='<div class="arl_calendario_dias_semana">'
			html+='<div class="arl_calendario_dia_semana"><p>L</p></div>'
			html+='<div class="arl_calendario_dia_semana"><p>M</p></div>'
			html+='<div class="arl_calendario_dia_semana"><p>X</p></div>'
			html+='<div class="arl_calendario_dia_semana"><p>J</p></div>'
			html+='<div class="arl_calendario_dia_semana"><p>V</p></div>'
			html+='<div class="arl_calendario_dia_semana"><p>S</p></div>'
			html+='<div class="arl_calendario_dia_semana"><p>D</p></div>'
		html+='</div>'
		html+='<div class="arl_calendario_dias">'

	var fecha_ficticia = new Date(ano,mes,1)
	var pre_filas = 6
	var d = 1
	var dia_semana = fecha_ficticia.getDay()-1
	if(dia_semana<0){
		//es domingo
		dia_semana = 6
	}

	var dias = []
	var mes_disponible = -1
	var ano_disponible = -1

	//comprobamos si el dia está disponible en base al array diferenciador
	console.log(disponibles)
	if(disponibles=='dias_disponibles'){
		var dias = dias_disponibles[mes].dias
	}else if(disponibles=='citas_agendadas'){
		
	}else if(disponibles==''){
		if(mes_disponible_data!=null&&mes_disponible_data!=undefined){
			mes_disponible = mes_disponible_data	
		}
		if(days_disponibles_data!=null&&days_disponibles_data!=undefined){
			dias = days_disponibles_data
		}
		if(ano_disponible_data!=null&&ano_disponible_data!=undefined){
			ano_disponible = ano_disponible_data
		}
	}else if(disponibles=='all'){

	}else{
		if(typeof disponibles=='object'){
			mes_disponible = disponibles.mes
			dias = disponibles.dias
			ano_disponible = disponibles.ano
		}
	}
	
	for(var i = 0;i<pre_filas;i++){
		html+='<div class="arl_calendario_dias_row">'

			for(var j = 0;j<7;j++){
				if(d<=total_dias){
					var disponible = false

					//comprobamos si el dia está disponible en base al array diferenciador
					if(disponibles=='dias_disponibles'){
						for(var k = 0;k<dias.length;k++){
							if(dias_disponibles[mes].dias[k].dia==d&&(mes+1)==dias_disponibles[mes].mes&&dias_disponibles[mes].ano==ano){
								disponible = true
							}
						}
					}else if(disponibles=='citas_agendadas'){
						for(var k = 0;k<citas_agendadas.length;k++){
							if(citas_agendadas[k].dia==d&&(mes+1)==citas_agendadas[k].mes&&citas_agendadas[k].ano==ano){
								disponible = true
							}
						}
					}else if(disponibles==''){
						//arreglo personalizado
						if((mes+1)==mes_disponible&&dias.indexOf(d)!=-1&&ano_disponible==ano){
							disponible = true
						}
					}else if(disponibles=='all'){
						disponible = true
					}else{
						//se estan enviado datos por el metodo printcalendario
						if((mes+1)==mes_disponible&&dias.indexOf(d)!=-1&&ano_disponible==ano){
							disponible = true
						}
					}

					var clase_range = ""
					if(rangos.indexOf(d)!=-1){
						clase_range = " arl_calendario_dias_dia_rango"
					}
					if(i==0){
						//primera fila
						if(j>=dia_semana){
							//este dia es el clickeado - No confundir con el dia actual
							if(d==dia_clickeado&&(mes+1)==mes_clickeado&&ano==ano_clickeado&&clickeado){
								if(disponible){
									html+='<div class="arl_calendario_dias_dia arl_calendario_dias_dia_selected'+clase_range+'" onclick="'+accion+'('+mes+','+ano+','+d+','+"'"+idname+"'"+')"><p>'+d+'</p></div>'
								}else{
									html+='<div class="arl_calendario_dias_dia arl_calendario_dias_dia_selected'+clase_range+'"><p>'+d+'</p></div>'
								}
								
							}else{
								//comprobar si el dia está disponible
								if(disponible){
									//un dia disponible
									html+='<div class="arl_calendario_dias_dia arl_calendario_dias_dia_disponible'+clase_range+'" onclick="'+accion+'('+mes+','+ano+','+d+','+"'"+idname+"'"+')"><p>'+d+'</p></div>'
								}else{
									html+='<div class="arl_calendario_dias_dia arl_calendario_dias_dia_normal'+clase_range+'"><p>'+d+'</p></div>'	
								}
							}
							d++
						}else{
							html+='<div class="arl_calendario_dias_dia arl_calendario_dias_dia_vacio"><p></p></div>'
						}
					}else{
						if(d==dia_clickeado&&(mes+1)==mes_clickeado&&ano==ano_clickeado&&clickeado){
							if(disponible){
								html+='<div class="arl_calendario_dias_dia arl_calendario_dias_dia_selected'+clase_range+'" onclick="'+accion+'('+mes+','+ano+','+d+','+"'"+idname+"'"+')"><p>'+d+'</p></div>'
							}else{
								html+='<div class="arl_calendario_dias_dia arl_calendario_dias_dia_selected'+clase_range+'"><p>'+d+'</p></div>'
							}
							
						}else{
							//comprobar si el dia está disponible 
							if(disponible){
								//un dia disponible
								html+='<div class="arl_calendario_dias_dia arl_calendario_dias_dia_disponible'+clase_range+'" onclick="'+accion+'('+mes+','+ano+','+d+','+"'"+idname+"'"+')"><p>'+d+'</p></div>'
							}else{
								html+='<div class="arl_calendario_dias_dia arl_calendario_dias_dia_normal'+clase_range+'"><p>'+d+'</p></div>'
							}
						}
						d++
					}	
				}else{
					html+='<div class="arl_calendario_dias_dia arl_calendario_dias_dia_vacio"><p></p></div>'
				}
			}
		html+='</div>'
	}
	
		html+='</div>'//cierra cont dias
	html+='</div>'//cierra calendario cont

	var calendar_div = document.getElementById('arl_calendario_id_'+idname)
	calendar_div.innerHTML = html
	fixCalendario(calendar_div)
}

function fixCalendario(div_calendario){
	//var mirar vacias
	var total_rows = div_calendario.getElementsByClassName('arl_calendario_dias_row')
	var row_ultima = total_rows[total_rows.length-1]
	var vacios = row_ultima.getElementsByClassName('arl_calendario_dias_dia_vacio').length
	
	if(vacios==7){
		var dias_cont = row_ultima.parentNode
		dias_cont.removeChild(row_ultima)
	}
}

function openCalendario(idname){
	var calendar_div = document.getElementById('arl_calendario_id_'+idname)
	var status = calendar_div.getAttribute('status')
	if(status=='off'){
		//mostrar
		actual_idname = idname
		calendar_div.classList.remove('arl_calendario_off')
		calendar_div.classList.add('arl_calendario_on')
		calendar_div.setAttribute('status','on')

		printCalendario({idname:idname})
		
		calendario_back.className = 'arl_calendario_back_on'
	}
}

function closeCalendario(idname){
	var calendar_div = document.getElementById('arl_calendario_id_'+idname)
	var status = calendar_div.getAttribute('status')
	if(status=='on'){
		//ocultar
		calendar_div.classList.remove('arl_calendario_on')
		calendar_div.classList.add('arl_calendario_off')
		calendar_div.setAttribute('status','off')
		calendario_back.className = 'arl_calendario_back_off'
		actual_idname = ''
	}
}

function clickMesPrev(idname){
	var calendar_div = document.getElementById('arl_calendario_id_'+idname)
	var mes_txt = calendar_div.getElementsByClassName('arl_calendario_mes_txt')[0]
	var ano_txt = calendar_div.getElementsByClassName('arl_calendario_ano_txt')[0]
	
	var ano = Number(ano_txt.getAttribute('value'))
	var mes = Number(mes_txt.getAttribute('value'))

	var prev_mes = mes-1
	if(prev_mes<0){
		prev_mes = 11
		ano--
	}

	printCalendario({ano:ano,mes:prev_mes,idname:idname})
}

function clickMesNext(idname){
	var calendar_div = document.getElementById('arl_calendario_id_'+idname)
	var mes_txt = calendar_div.getElementsByClassName('arl_calendario_mes_txt')[0]
	var ano_txt = calendar_div.getElementsByClassName('arl_calendario_ano_txt')[0]
	
	var ano = Number(ano_txt.getAttribute('value'))
	var mes = Number(mes_txt.getAttribute('value'))

	var next_mes = mes+1
	if(next_mes>11){
		next_mes = 0
		ano++
	}

	printCalendario({ano:ano,mes:next_mes,idname:idname})
}

function selectDate(mes,ano,dia,idname){
	var input_text = document.getElementById(idname)
	var calendar_div = document.getElementById('arl_calendario_id_'+idname)
	input_text.value = dia+"/"+(mes+1)+"/"+ano
	closeCalendario(idname)
}

var calendario_back = document.createElement('div')
calendario_back.id = 'arl_calendario_back'
calendario_back.className = 'arl_calendario_back_off'
calendario_back.onclick = function(){
	closeCalendario(actual_idname)
}
document.body.appendChild(calendario_back)