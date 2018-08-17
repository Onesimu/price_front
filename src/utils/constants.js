export const regionId = ['','非洲','亚洲','欧洲','北美洲','大洋洲','南美洲']

export const db = {}

// new Date().toISOString().replace(/\..+/,'') + 'Z'

export const getDate = (isostr) => {
  if(!isostr){ return ''}
  // return isostr.replace(/\..+/,'').replace('T',' ')
  return isostr.replace(/\..+/,'').replace(/T.+/,'')
  // const parts = isostr.match(/\d+/g);
  // const s = parts[0]+'-'+parts[1]+'-'+parts[2]+' '+parts[3]+':'+parts[4]+':'+parts[5]
  // return s
  // return new Date(s).toLocaleString()
}