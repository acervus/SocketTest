���v���O�C���C���X�g�[���菇
    �@Chrome����ȉ�URL���J���܂��B
   chrome://settings/
    �A�u�g���@�\�v��I�����܂��B
    �B�J������ʂɁA�ȉ���̃v���O�C����D&D���܂��B
   TcpBackgroundScript.crx
   TcpContentScript.crx

   �ȏ�̎菇�Ńv���O�C�����C���X�g�[���͊����ł��B

������m�F�菇
   �@�v���W�F�N�g�ɔz�u�����ȉ���HTML�t�@�C�����J���܂��B
     ��URL��:http://localhost/SocketTest/html/test.html
   �A�r�c����T���v�����J���A<listen>�{�^�����N���b�N���܂��B
   �BChrome����ȉ�URL���J���ATcp Background Script ���N���b�N���܂��B
  chrome://apps/

   �ȏ�ŁA�r�c����c�[���ƁAtest.html�ԂŃ\�P�b�g�ʐM���m������܂��B
   ��_���ӎ����Ƃ��āA�r�c����c�[����test.html�Ƀ��b�Z�[�W�𑗐M����ۂ́Achrome��Developer Tools���J���Ă��Ȃ��Ɠ����܂���B
   ��������́Achrome�̃^�u�Ƀ��b�Z�[�W�𑗐M����A�ȉ��̋L�q({active: true, currentWindow: false})�ɂ����̂ł��B
       �p�����[�^�[�����������A{active: true, currentWindow: true}�ł��܂����������Ȃ̂ł����A�_���ł����B���t�@�����X���m�F���܂��B

-------------------------
  // �A���A�N�e�B�u�̃^�u�ɑ��M
  chrome.tabs.query({active: true, currentWindow: false}, function(tabs) {
       	var param = {name: "sendMessageTest", message:request.message};
       	for(var i=0; i<tabs.length; i++){
       		chrome.tabs.sendMessage(tabs[i].id, param, function(response) {
           		console.log(response);
           	});
       	}
  });
-------------------------

���J���菇
    �@Chrome����ȉ�URL���J���܂��B
   chrome://settings/
    �A�u�g���@�\�v��I�����܂��B
    �B<�p�b�P�[�W������Ă��Ȃ��g���@�\��ǂݍ���>���N���b�N���܂��B
    �CSocketTest�v���W�F�N�g���́A�ȉ�2�̃t�H���_���w�肵�ēǂݍ��݂܂��B
   TcpBackgroundScript
   TcpContentScript
    
   ������̎菇�Ńv���O�C�����C���X�g�[�������ꍇ�A�R�[�h�̔��f�������ɔ��f�����悤�ɂȂ�܂��B
 