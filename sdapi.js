//javascript plugin can't read images from local directory so we send a request to local server to read the image file and send it back to plugin as image string base64
async function getInitImage (init_image_name) {
  console.log('getInitImage(): get Init Image from the server :')
  const payload = {
    init_image_name: init_image_name
  }

  const full_url = 'http://127.0.0.1:8000/getInitImage/'
  console.log(full_url)
  console.log('getInitImage payload:', payload)
  let request = await fetch(full_url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    // "body": payload
  })

  let json = await request.json()
  console.log('json:')
  console.dir(json)
  base64data = json.init_image_str
  image_src = `data:image/png;base64, ${base64data}`
  return image_src

  // console.log(img.src)

  // let img_blob =  await (await fetch(img.src)).blob()
  // console.log("img_blob:")
  // console.dir(img_blob)
}

async function requestTxt2Img (payload) {
  try {
    console.log('requestTxt2Img(): about to send a fetch request')

    const full_url = 'http://127.0.0.1:8000/txt2img/'
    console.log(full_url)

    let request = await fetch(full_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
      // "body": payload
    })

    let json = await request.json()
    console.log('requestTxt2Img json:')
    console.dir(json)

    return json
  } catch (e) {
    console.warn(e)
    return {}
  }
}



async function requestImg2Img (payload) {
  console.log('requestImg2Img(): about to send a fetch request')
  try{

    const full_url = 'http://127.0.0.1:8000/img2img/'
    console.log(full_url)
    console.log('requestImg2Img payload is: ', payload)
    let request = await fetch(full_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    // "body": payload
  })
  
  let json = await request.json()
  console.log('requestImg2Img json:')
  console.dir(json)
  
  return json
}
catch(e){
  console.warn(e)
return {}
}
}

async function requestProgress () {
  console.log('requestProgress: ')

  const full_url =
    'http://127.0.0.1:8000/sdapi/v1/progress?skip_current_image=false'
  let request = await fetch(full_url)
  let json = await request.json()
  console.log('progress json:')
  console.dir(json)

  return json
}

async function requestGetModels () {
  console.log('requestGetModels: ')
  let json = []
  try{

    const full_url = 'http://127.0.0.1:8000/sdapi/v1/sd-models'
    let request = await fetch(full_url)
    json = await request.json()
    console.log('models json:')
    console.dir(json)
    
  }catch(e){
    console.warn(`issues requesting from ${full_url}`,e)
  }
    return json
}

async function requestGetSamplers () {
  console.log('requestGetSamplers: ')

  const full_url = 'http://127.0.0.1:8000/sdapi/v1/samplers'
  let request = await fetch(full_url)
  let json = await request.json()
  console.log('samplers json:')
  console.dir(json)

  return json
}

async function requestSwapModel (model_title) {
  console.log('requestSwapModel: ')
  // const full_url = 'http://127.0.0.1:8000/swapModel'

  const full_url = 'http://127.0.0.1:8000/sdapi/v1/options'
  payload = {
    sd_model_checkpoint: model_title
  }
  let request = await fetch(full_url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    // "body": payload
  })

  let json = await request.json()

  console.log('models json:')
  console.dir(json)

  return json
}

async function requestInterrupt (model_title) {
  try {
    console.log('requestInterrupt: ')
    // const full_url = 'http://127.0.0.1:8000/swapModel'

    const full_url = 'http://127.0.0.1:8000/sdapi/v1/interrupt'
    // payload = {
    //   sd_model_checkpoint: model_title
    // }
    payload = ''
    let request = await fetch(full_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(payload)
      // "body": payload
    })

    console.log("interrupt request:", request)
    let json = await request.json()

    console.log('interrupt json:')
    console.dir(json)

    return json
  } catch (e) {
    console.warn(e)
  }
}

async function getVersionRequest(){
  // version = "v0.0.0"
    console.log('requestGetSamplers: ')
  try {

    const full_url = 'http://127.0.0.1:8000/version'
    let request = await fetch(full_url)
    let json = await request.json()
    console.log('version json:',json)
    version = json['version']
    
    return version
  }catch(e){
    console.warn(e)
    version = "v0.0.0"

    return version
  }
  

}

async function changeSdUrl(new_sd_url){
  // version = "v0.0.0"
    console.log('changeSdUrl: new_sd_url:', new_sd_url)
  try {

    payload= {
      "sd_url": new_sd_url
    }

    const full_url = 'http://127.0.0.1:8000/sd_url/'
    console.log("changeSdUrl: payload: ", payload)
  let request = await fetch(full_url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
    
  })


    
    // let json = await request.json()
    // console.log('changeSdUrl:',json)
    console.log('changeSdUrl: request: ',request)
    
    
    
  }catch(e){
    console.warn(e)
    
  }
  

}

// function printTheJSONInPrettyFormat(json) {
//   // var badJSON = document.getElementById('prettyJSONFormat').value;
//   // var parseJSON = JSON.parse(badJSON);
//   // var JSONInPrettyFormat = JSON.stringify(json, undefined, 4);
//   // return 
// }
async function loadHistory (uniqueDocumentId) {
  
  let json = {}
  try {
    payload = {
      "uniqueDocumentId":uniqueDocumentId
    }

    const full_url = 'http://127.0.0.1:8000/history/load'

    let request = await fetch(full_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    json = await request.json()
    console.log('loadHistory:', json)
    // console.log('loadPromptShortcut: request: ',request)
  } catch (e) {
    console.warn(e)
  }

  return [json['image_paths'],json['metadata_jsons']]
}
async function loadPromptShortcut () {
  // console.log('loadPromptShortcut:')
  let json = {}
  try {
    payload = {}

    const full_url = 'http://127.0.0.1:8000/prompt_shortcut/load'

    let request = await fetch(full_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    json = await request.json()
    console.log('loadPromptShortcut:', json)
    // console.log('loadPromptShortcut: request: ',request)
  } catch (e) {
    console.warn(e)
  }

  return json['prompt_shortcut']
}

async function savePromptShortcut (prompt_shortcut) {
  // console.log('loadPromptShortcut:')
  let json = {}
  try {
    payload = {"prompt_shortcut":prompt_shortcut}

    const full_url = 'http://127.0.0.1:8000/prompt_shortcut/save'

    let request = await fetch(full_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    json = await request.json()
    console.log('savePromptShortcut:', json)
    // console.log('loadPromptShortcut: request: ',request)
  } catch (e) {
    console.warn(e)
  }

  return json['prompt_shortcut']
}
async function setInpaintMaskWeight(value) {
  const full_url = 'http://127.0.0.1:8000/sdapi/v1/options'
 try {
  payload = {
    inpainting_mask_weight: value
  }
  await fetch(full_url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })

 } catch (e) {
  console.warn(e)
 }
  
}

 async function requestGetConfig() {
  console.log('requestGetConfig: ')
  let json = []
  const full_url = 'http://127.0.0.1:8000/config'
  try{

    let request = await fetch(full_url)
    json = await request.json()
    console.log('models json:')
    console.dir(json)
    
  }catch(e){
    console.warn(`issues requesting from ${full_url}`,e)
  }
    return json
}
async function requestGetOptions() {
  console.log('requestGetOptions: ')
  let json = []
  const full_url = 'http://127.0.0.1:8000/sdapi/v1/options'
  try{

    let request = await fetch(full_url)
    json = await request.json()
    console.log('models json:')
    console.dir(json)
    
  }catch(e){
    console.warn(`issues requesting from ${full_url}`,e)
  }
    return json
}


async function imageSearch (keywords) {
  
  let json = {}
  try {
    payload = {
      "keywords":keywords
    }

    const full_url = 'http://127.0.0.1:8000/search/image/'

    let request = await fetch(full_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    json = await request.json()
    console.log('imageSearch:', json)
    
    return json['images']
    
  } catch (e) {
    console.warn(e)
  
  }
    return []
}

module.exports = {
  requestTxt2Img,
  requestImg2Img,
  getInitImage,
  requestProgress,
  requestGetModels,
  requestSwapModel,
  requestInterrupt,
  requestGetSamplers,
  getVersionRequest,
  changeSdUrl,
  loadPromptShortcut,
  savePromptShortcut,
  loadHistory,
  setInpaintMaskWeight,
  requestGetConfig,
  requestGetOptions,
  imageSearch
}
