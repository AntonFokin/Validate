function ValidateForm(settings){
	this.settings= settings;
	if(this.settings.newRegExp){
		this.addRegExp(this.settings.newRegExp);
	};
};

ValidateForm.prototype.init= function(){
	var self= this;
	this._change= this.settings.onchange;
	this.submit= document.querySelectorAll('input.send-form');
	this.allInput= document.querySelectorAll('input');
	this._p2= document.getElementById("modal2").querySelector("p");
	this.actionUi(self);
};

ValidateForm.prototype.regExp= {
	name: /[a-zа-я]/gi,
	phone: /[0-9]/g,
	email: /^[A-z0-9._-]+@[A-z0-9.-]+\.[A-z]{2,4}$/,
	password: /^[a-z0-9]{8,}$/i,
};

ValidateForm.prototype.addRegExp= function(obj){
	for(var key in obj){
		this.regExp[key]= obj[key];
	};
};
ValidateForm.prototype.actionUi= function(self){
	if(this._change){
		for(var i=0, max=this.allInput.length; i<max; i++){
			this.allInput[i].onchange= function(event){
				self.validForm(this);
			};
		};
	};	
	for(var i= 0, max= this.submit.length; i<max; i++){
		this.submit[i].onclick= function(event){
			event.preventDefault();
			self.validForm(this);
		};
	};
};
ValidateForm.prototype.validForm= function(curentElement){
	var element= curentElement;	
	if(element.type == "submit"){
		var checkInput= {};
		this.form= element.closest('form');
		for(var i= 0, max= this.form.length; i<max; i++){
			if(this.form[i].matches('input[type="text"]') || this.form[i].matches('input[type="password"]')){
				var inputName= this.form[i].name;
				if(this.form[i].value.length == 0){
					checkInput[inputName]= null;
					continue;
				};
				if(this.regExp[inputName].test(this.form[i].value)){
					this.form[i].classList.add('validate');
					this.form[i].classList.remove('invalid');
					checkInput[inputName]= true;	
				}else{
					this.form[i].classList.add('invalid');
					this.form[i].classList.remove('validate');
					checkInput[inputName]= false;
				};
			};
		};
		this.modal(checkInput);
	}else{
		var name= element.name;
		if(this.regExp[name].test(element.value)){
			element.classList.add('validate');
			element.classList.remove('invalid');
		}else{
			element.classList.add('invalid');
			element.classList.remove('validate');
		};
		return;
	};
};
ValidateForm.prototype.modal= function(checkInput){	
	var anchor= true;
	for(var input in checkInput){
		if(checkInput[input] == null){
			switch(input){
				case "name": this._p2.textContent= "Вы не ввели поле First Name!"; $('#modal2').openModal();
					break;
				case "phone": this._p2.textContent= "Вы не ввели поле Phone!"; $('#modal2').openModal();
					break;
				case "email": this._p2.textContent= "Вы не ввели поле Email!"; $('#modal2').openModal();
					break;
				case "password": this._p2.textContent= "Вы не ввели поле Password!"; $('#modal2').openModal();
					break;
			};
			anchor= false;
			break;
		}else if(checkInput[input] == false){
			switch(input){
				case "name": this._p2.textContent= "Имя должно содержать только буквы!"; $('#modal2').openModal();
					break;
				case "phone": this._p2.textContent= "Телефон должен содержать только цифры!"; $('#modal2').openModal();
					break;
				case "email": this._p2.textContent= "Не верно указан Email!"; $('#modal2').openModal();
					break;
				case "password": this._p2.textContent= "Пароль должен содержать не менее 8-ми символов и содержать только буквы, и цифры!"; $('#modal2').openModal();
					break;
			};
			anchor= false;
			break;
		};
	};
	if(anchor){
		$('#modal1').openModal();
	};
};
var valid= new ValidateForm({
	newRegExp:{
		phone: /[0-9]/g,
	},
	onchange: true,
});
window.onload= valid.init.call(valid);