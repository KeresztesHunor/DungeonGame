export function tagTwo(tag, parameters = {}, content = [])
{
    let txt = "";
    content.forEach(element => txt += element);
    return `${tagOne(tag, parameters)}${txt}</${tag}>`;
}

export function tagLst(list, callbackMethod)
{
    let txt = "";
    list.forEach(element => txt += callbackMethod(element));
    return txt;
}

export function tagDct(dict, callbackMethod)
{
    let txt = "";
    for (const KEY in dict)
    {
        txt += callbackMethod(KEY, dict[KEY]);
    }
    return txt;
}

export function tagOne(tag, parameters = {})
{
    return `<${tag}${tagDct(parameters, (key, value) => ` ${key}="${value}"`)}>`;
}