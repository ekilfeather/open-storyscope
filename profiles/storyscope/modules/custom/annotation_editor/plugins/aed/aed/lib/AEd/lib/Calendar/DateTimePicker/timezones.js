/**
 * timezones.js
 *
 *  
 * @author: Milos Cudrak
 * 
 */


  var AEdTimezonesID = 'AEdtimezones';

  var AEdTimezonesValues = [];
  
  // Values from http://www.timezonegenius.com/capitals

  AEdTimezonesValues.push({'city': "Afghanistan (Kabul)", 'offset': "+04:30"});
  AEdTimezonesValues.push({'city': "Albania (Tirana)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Algeria (Algiers)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "American Samoa (Pago Pago)", 'offset': "-11:00"});
  AEdTimezonesValues.push({'city': "Andorra (Andorra la Vella)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Angola (Luanda)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Anguilla (The Valley)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Antigua and Barbuda (St. John's)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Argentina (Buenos Aires)", 'offset': "-03:00"});
  AEdTimezonesValues.push({'city': "Armenia (Yerevan)", 'offset': "+04:00"});
  AEdTimezonesValues.push({'city': "Aruba (Oranjestad)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Australia (Canberra, ACT)", 'offset': "+10:00"});
  AEdTimezonesValues.push({'city': "Austria (Vienna)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Azerbaijan (Baku)", 'offset': "+05:00"});
  AEdTimezonesValues.push({'city': "Bahamas (Nassau)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Bahrain (Manama)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Bangladesh (Dhaka)", 'offset': "+06:00"});
  AEdTimezonesValues.push({'city': "Barbados (Bridgetown)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Belarus (Minsk)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Belgium (Brussels)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Belize (Belmopan)", 'offset': "-06:00"});
  AEdTimezonesValues.push({'city': "Benin (Porto-Novo)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Bermuda (Hamilton)", 'offset': "-03:00"});
  AEdTimezonesValues.push({'city': "Bhutan (Thimphu)", 'offset': "+06:00"});
  AEdTimezonesValues.push({'city': "Bolivia (La Paz)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Bosnia and Herzegovina (Sarajevo)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Botswana (Gaborone)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Brazil (Brasilia)", 'offset': "-03:00"});
  AEdTimezonesValues.push({'city': "British Virgin Islands (Road Town)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Brunei (Bandar Seri Begawan)", 'offset': "+08:00"});
  AEdTimezonesValues.push({'city': "Bulgaria (Sofia)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Burkina Faso (Ouagadougou)", 'offset': "+00:00"});
  AEdTimezonesValues.push({'city': "Burma (Myanmar) (Yangon)", 'offset': "+06:30"});
  AEdTimezonesValues.push({'city': "Burundi (Bujumbura)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Cambodia (Phnom Penh)", 'offset': "+07:00"});
  AEdTimezonesValues.push({'city': "Cameroon (Yaoundé)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Canada (Ottawa, ON)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Cape Verde (Praia)", 'offset': "-01:00"});
  AEdTimezonesValues.push({'city': "Cayman Islands (George Town)", 'offset': "-05:00"});
  AEdTimezonesValues.push({'city': "Central African Republic (Bangui)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Chad (N'Djamena)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Chile (Santiago)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "China (Beijing)", 'offset': "+08:00"});
  AEdTimezonesValues.push({'city': "Christmas Island (Flying Fish Cove)", 'offset': "+07:00"});
  AEdTimezonesValues.push({'city': "Colombia (Bogota)", 'offset': "-05:00"});
  AEdTimezonesValues.push({'city': "Comoros (Moroni)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Congo-Brazzaville (Brazzaville)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Congo-Kinshasa (Kinshasa)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Cook Islands (Avarua)", 'offset': "-10:00"});
  AEdTimezonesValues.push({'city': "Costa Rica (San Jose)", 'offset': "-06:00"});
  AEdTimezonesValues.push({'city': "Croatia (Zagreb)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Cuba (Havana)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Curaçao (Willemstad)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Cyprus (Nicosia)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Czech Republic (Prague)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Denmark (Copenhagen)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Djibouti (Djibouti)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Dominica (Roseau)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Dominican Republic (Santo Domingo)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Ecuador (Quito)", 'offset': "-05:00"});
  AEdTimezonesValues.push({'city': "Egypt (Cairo)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "El Salvador (San Salvador)", 'offset': "-06:00"});
  AEdTimezonesValues.push({'city': "Equatorial Guinea (Malabo)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Eritrea (Asmara)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Estonia (Tallinn)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Ethiopia (Addis Ababa)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Falkland Islands (Stanley)", 'offset': "-03:00"});
  AEdTimezonesValues.push({'city': "Faroe Islands (Tórshavn)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Fiji (Suva)", 'offset': "+12:00"});
  AEdTimezonesValues.push({'city': "Finland (Helsinki)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "France (Paris)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "French Guiana (Cayenne)", 'offset': "-03:00"});
  AEdTimezonesValues.push({'city': "French Polynesia (Papeete)", 'offset': "-10:00"});
  AEdTimezonesValues.push({'city': "Gabon (Libreville)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Gambia (Banjul)", 'offset': "+00:00"});
  AEdTimezonesValues.push({'city': "Georgia (Tbilisi)", 'offset': "+04:00"});
  AEdTimezonesValues.push({'city': "Germany (Berlin)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Ghana (Accra)", 'offset': "+00:00"});
  AEdTimezonesValues.push({'city': "Gibraltar (Gibraltar)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Greece (Athens)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Grenada (St. George's)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Guadeloupe (Basse-Terre)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Guam (Hagatna)", 'offset': "+10:00"});
  AEdTimezonesValues.push({'city': "Guatemala (Guatemala City)", 'offset': "-06:00"});
  AEdTimezonesValues.push({'city': "Guinea (Conakry)", 'offset': "+00:00"});
  AEdTimezonesValues.push({'city': "Guinea-Bissau (Bissau)", 'offset': "+00:00"});
  AEdTimezonesValues.push({'city': "Guyana (Georgetown)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Haiti (Port-au-Prince)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Holy See (Vatican) (Vatican City)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Honduras (Tegucigalpa)", 'offset': "-06:00"});
  AEdTimezonesValues.push({'city': "Hungary (Budapest)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Iceland (Reykjavik)", 'offset': "+00:00"});
  AEdTimezonesValues.push({'city': "India (Delhi)", 'offset': "+05:30"});
  AEdTimezonesValues.push({'city': "Indonesia (Jakarta)", 'offset': "+07:00"});
  AEdTimezonesValues.push({'city': "Iran (Tehran)", 'offset': "+04:30"});
  AEdTimezonesValues.push({'city': "Iraq (Baghdad)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Ireland (Dublin)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Israel (Tel Aviv)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Italy (Rome)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Ivory Coast (Yamoussoukro)", 'offset': "+00:00"});
  AEdTimezonesValues.push({'city': "Jamaica (Kingston)", 'offset': "-05:00"});
  AEdTimezonesValues.push({'city': "Japan (Tokyo)", 'offset': "+09:00"});
  AEdTimezonesValues.push({'city': "Jordan (Amman)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Kazakhstan (Astana)", 'offset': "+06:00"});
  AEdTimezonesValues.push({'city': "Kenya (Nairobi)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Kiribati (South Tarawa)", 'offset': "+12:00"});
  AEdTimezonesValues.push({'city': "Kuwait (Kuwait City)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Kyrgyzstan (Bishkek)", 'offset': "+06:00"});
  AEdTimezonesValues.push({'city': "Laos (Vientiane)", 'offset': "+07:00"});
  AEdTimezonesValues.push({'city': "Latvia (Riga)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Lebanon (Beirut)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Lesotho (Maseru)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Liberia (Monrovia)", 'offset': "+00:00"});
  AEdTimezonesValues.push({'city': "Libya (Tripoli)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Liechtenstein (Vaduz)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Lithuania (Vilnius)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Luxembourg (Luxembourg City)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Macau (Macau)", 'offset': "+08:00"});
  AEdTimezonesValues.push({'city': "Macedonia (Skopje)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Madagascar (Antananarivo)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Malawi (Lilongwe)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Malaysia (Kuala Lumpur)", 'offset': "+08:00"});
  AEdTimezonesValues.push({'city': "Maldives (Malé)", 'offset': "+05:00"});
  AEdTimezonesValues.push({'city': "Mali (Bamako)", 'offset': "+00:00"});
  AEdTimezonesValues.push({'city': "Malta (Valletta)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Marshall Islands (Majuro)", 'offset': "+12:00"});
  AEdTimezonesValues.push({'city': "Martinique (Fort-de-France)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Mauritania (Nouakchott)", 'offset': "+00:00"});
  AEdTimezonesValues.push({'city': "Mauritius (Port Louis)", 'offset': "+04:00"});
  AEdTimezonesValues.push({'city': "Mexico (Mexico City)", 'offset': "-05:00"});
  AEdTimezonesValues.push({'city': "Micronesia (Palikir)", 'offset': "+11:00"});
  AEdTimezonesValues.push({'city': "Moldova (Chisinau)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Monaco (Monaco)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Mongolia (Ulan Bator)", 'offset': "+08:00"});
  AEdTimezonesValues.push({'city': "Montenegro (Podgorica)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Montserrat (Plymouth)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Morocco (Rabat)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Mozambique (Maputo)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Namibia (Windhoek)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Nauru (Yaren)", 'offset': "+12:00"});
  AEdTimezonesValues.push({'city': "Nepal (Kathmandu)", 'offset': "+05:45"});
  AEdTimezonesValues.push({'city': "Netherlands (The Hague)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "New Caledonia (Nouméa)", 'offset': "+11:00"});
  AEdTimezonesValues.push({'city': "New Zealand (Wellington)", 'offset': "+12:00"});
  AEdTimezonesValues.push({'city': "Nicaragua (Managua)", 'offset': "-06:00"});
  AEdTimezonesValues.push({'city': "Niger (Niamey)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Nigeria (Abuja)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Niue (Alofi)", 'offset': "-11:00"});
  AEdTimezonesValues.push({'city': "North Korea (Pyongyang)", 'offset': "+09:00"});
  AEdTimezonesValues.push({'city': "Northern Mariana Islands (Saipan)", 'offset': "+10:00"});
  AEdTimezonesValues.push({'city': "Norway (Oslo)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Oman (Muscat)", 'offset': "+04:00"});
  AEdTimezonesValues.push({'city': "Pakistan (Islamabad)", 'offset': "+05:00"});
  AEdTimezonesValues.push({'city': "Palau (Koror)", 'offset': "+09:00"});
  AEdTimezonesValues.push({'city': "Palestinian Territory (Ramallah)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Panama (Panama City)", 'offset': "-05:00"});
  AEdTimezonesValues.push({'city': "Paraguay (Asuncion)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Peru (Lima)", 'offset': "-05:00"});
  AEdTimezonesValues.push({'city': "Philippines (Manila)", 'offset': "+08:00"});
  AEdTimezonesValues.push({'city': "Pitcairn (Adamstown)", 'offset': "-08:00"});
  AEdTimezonesValues.push({'city': "Poland (Warsaw)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Portugal (Lisbon)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Puerto Rico (San Juan)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Qatar (Doha)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Réunion (Saint-Denis)", 'offset': "+04:00"});
  AEdTimezonesValues.push({'city': "Romania (Bucharest)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Russia (Moscow)", 'offset': "+04:00"});
  AEdTimezonesValues.push({'city': "Rwanda (Kigali)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Saint Kitts and Nevis (Basseterre)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Saint Lucia (Castries)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Saint Vincent and the Grenadines (Kingstown)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Samoa (Apia)", 'offset': "+13:00"});
  AEdTimezonesValues.push({'city': "San Marino (San Marino)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Sao Tome and Principe (Sao Tome)", 'offset': "+00:00"});
  AEdTimezonesValues.push({'city': "Saudi Arabia (Riyadh)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Senegal (Dakar)", 'offset': "+00:00"});
  AEdTimezonesValues.push({'city': "Serbia (Belgrade)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Sierra Leone (Freetown)", 'offset': "+00:00"});
  AEdTimezonesValues.push({'city': "Singapore (Singapore)", 'offset': "+08:00"});
  AEdTimezonesValues.push({'city': "Slovakia (Bratislava)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Slovenia (Ljubljana)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Solomon Islands (Honiara)", 'offset': "+11:00"});
  AEdTimezonesValues.push({'city': "Somalia (Mogadishu)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "South Africa (Pretoria)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "South Korea (Seoul)", 'offset': "+09:00"});
  AEdTimezonesValues.push({'city': "Spain (Madrid)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Sri Lanka (Colombo)", 'offset': "+05:30"});
  AEdTimezonesValues.push({'city': "Sudan (Khartoum)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Suriname (Paramaribo)", 'offset': "-03:00"});
  AEdTimezonesValues.push({'city': "Swaziland (Mbanane)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Sweden (Stockholm)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Switzerland (Berne)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Syria (Damascus)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Taiwan (Taipei)", 'offset': "+08:00"});
  AEdTimezonesValues.push({'city': "Tajikistan (Dushanbe)", 'offset': "+05:00"});
  AEdTimezonesValues.push({'city': "Tanzania (Dar es Salaam)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Thailand (Bangkok)", 'offset': "+07:00"});
  AEdTimezonesValues.push({'city': "Timor-Leste (Dili)", 'offset': "+09:00"});
  AEdTimezonesValues.push({'city': "Togo (Lomé)", 'offset': "+00:00"});
  AEdTimezonesValues.push({'city': "Tonga (Nuku'alofa)", 'offset': "+13:00"});
  AEdTimezonesValues.push({'city': "Trinidad and Tobago (Port of Spain)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Tunisia (Tunis)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Turkey (Ankara)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Turkmenistan (Ashgabat)", 'offset': "+05:00"});
  AEdTimezonesValues.push({'city': "Turks and Caicos Islands (Cockburn Town)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Tuvalu (Funafuti)", 'offset': "+12:00"});
  AEdTimezonesValues.push({'city': "Uganda (Kampala)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Ukraine (Kiev)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "United Arab Emirates (Abu Dhabi)", 'offset': "+04:00"});
  AEdTimezonesValues.push({'city': "United Kingdom (London)", 'offset': "+01:00"});
  AEdTimezonesValues.push({'city': "Uruguay (Montevideo)", 'offset': "-03:00"});
  AEdTimezonesValues.push({'city': "US Virgin Islands (Charlotte Amalie)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "USA (Washington, DC)", 'offset': "-04:00"});
  AEdTimezonesValues.push({'city': "Uzbekistan (Tashkent)", 'offset': "+05:00"});
  AEdTimezonesValues.push({'city': "Vanuatu (Port Vila)", 'offset': "+11:00"});
  AEdTimezonesValues.push({'city': "Venezuela (Caracas)", 'offset': "-05:30"});
  AEdTimezonesValues.push({'city': "Vietnam (Hanoi)", 'offset': "+07:00"});
  AEdTimezonesValues.push({'city': "Yemen (Sana'a)", 'offset': "+03:00"});
  AEdTimezonesValues.push({'city': "Zambia (Lusaka)", 'offset': "+02:00"});
  AEdTimezonesValues.push({'city': "Zimbabwe (Harare)", 'offset': "+02:00"});



// Method returns timezones as options for input type search

function AEdTimezones() {

  // Detect datalist native support
  // Firefox is the only browser which supports datalist completly
  var node = (AEd.isFF) ? document.createElement('datalist') : document.createElement('select');

  var opt = null;
  node.setAttribute('id', AEdTimezonesID);

  for (var x = 0; x < AEdTimezonesValues.length; x++) {
 
     opt = document.createElement('option');
     opt.text = AEdTimezonesValues[x].city;       // Firefox
     opt.innerText = AEdTimezonesValues[x].city;  // Internet Explorer
     opt.value = AEdTimezonesValues[x].offset;
     node.appendChild(opt);
  }

  // Hotfix for missing outerHTML method in Firefox 4 (and maybe some higher too)
  return (node.outerHTML) ? node.outerHTML : '<' + node.nodeName + ' id="' + node.id + '">' + node.innerHTML + '</' + node.nodeName + '>';
}
