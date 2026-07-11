const models = [
  { id: 1, category: 1, label: 'F01053', icon: 'traffic-light', description: 'Velocar Red&Speed F01053', ministerialApproval: 'Decreto Prot.56214 del 08.07.2008\nEstensione Decreto Prot.3616 del 25.06.2012 e Prot.4614 del 29.07.2013' },
  { id: 2, category: 1, label: 'F01054', icon: 'tachometer-alt', description: 'Velocar Red&Speed F01054', ministerialApproval: 'Decreto Prot.56214 del 08.07.2008\nEstensione Decreto Prot.3616 del 25.06.2012 e Prot.4614 del 29.07.2013' },
  { id: 3, category: 1, label: 'F01055', icon: 'tachometer-alt', description: 'Velocar Red&Speed F01055', ministerialApproval: 'Decreto Prot.56214 del 08.07.2008\nEstensione Decreto Prot.3616 del 25.06.2012 e Prot.4614 del 29.07.2013' },
  { id: 4, category: 2, label: 'SIM TIM' },
  { id: 11, category: 6, label: 'ONCELL G3110 HSDPA' },
  { id: 13, category: 7, label: 'NAS LACIE' },
  { id: 14, category: 7, label: 'QNAP TS-112' },
  { id: 15, category: 7, label: 'NAS BUFFALO' },
  { id: 16, category: 8, label: 'E1214' },
  { id: 18, category: 9, label: 'WAG 102' },
  { id: 21, category: 10, label: 'BOX WEISS' },
  { id: 23, category: 8, label: 'E1242' },
  { id: 24, category: 7, label: 'NAS QNAP TS-110' },
  { id: 41, category: 12, label: 'VRSQ001', icon: 'plug', description: 'Linea elettrica 230VAC' },
  { id: 42, category: 12, label: 'VRSQ002', icon: 'plug', description: 'Linea elettrica 230VAC' },
  { id: 43, category: 12, label: 'VRSQ004', icon: 'plug', description: 'Linea elettrica 230VAC' },
  { id: 44, category: 12, label: 'VRSQ005', icon: 'plug', description: 'Linea elettrica 230VAC' },
  { id: 45, category: 12, label: 'VRSQF01', icon: 'solar-panel', description: 'Impianto fotovoltaico a isola' },
  { id: 46, category: 12, label: 'VRSQF02', icon: 'solar-panel', description: 'Impianto fotovoltaico a isola' },
  { id: 47, category: 12, label: 'VRSQS01', icon: 'plug', description: 'Linea elettrica 230VAC' },
  { id: 48, category: 12, label: 'VRSQS03', icon: 'plug', description: 'Linea elettrica 230VAC' },
  { id: 49, category: 12, label: 'VRSQS04', icon: 'plug', description: 'Linea elettrica 230VAC' },
  { id: 51, category: 6, label: 'ONCELL 5104 HSDPA' },
  { id: 52, category: 6, label: 'ONCELL 5104 HSPA' },
  { id: 53, category: 12, label: 'VRSQS02', icon: 'plug', description: 'Linea elettrica 230VAC' },
  { id: 54, category: 12, label: 'VRSQF03', icon: 'solar-panel', description: 'Impianto fotovoltaico a isola' },
  { id: 55, category: 12, label: 'VRSQRS01', icon: 'plug', description: 'Linea elettrica 230VAC' },
  { id: 56, category: 10, label: 'KIT 1054' },
  { id: 57, category: 10, label: 'KIT 1055' },
  { id: 58, category: 6, label: 'ONCELL G3110 HSPA' },
  { id: 59, category: 14, label: 'VRS-EVO-L0', icon: 'traffic-light', description: 'Velocar Red&Speed EVO L0', ministerialApproval: 'Decreto Prot.814 del 24.02.2015\nEstensione Decreto Prot.6099 del 18.11.2015' },
  { id: 60, category: 14, label: 'VRS-EVO-L1', icon: 'tachometer-alt', description: 'Velocar Red&Speed EVO L1', ministerialApproval: 'Decreto Prot.814 del 24.02.2015\nEstensione Decreto Prot.6099 del 18.11.2015' },
  { id: 61, category: 14, label: 'VRS-EVO-L2', icon: 'tachometer-alt', description: 'Velocar Red&Speed EVO L2', ministerialApproval: 'Decreto Prot.814 del 24.02.2015\nEstensione Decreto Prot.6099 del 18.11.2015' },
  { id: 62, category: 9, label: 'WNDAP350' },
  { id: 63, category: 12, label: 'VRSQP03' },
  { id: 64, category: 9, label: 'BLACK BOX' },
  { id: 66, category: 6, label: 'TK802L-EX0' },
  { id: 67, category: 6, label: 'TK815L-EX0' },
  { id: 68, category: 6, label: 'TK815L-EXW' },
  { id: 69, category: 12, label: 'EVOQ001', icon: 'plug', description: 'Linea elettrica 230VAC' },
  { id: 70, category: 12, label: 'EVOQF01', icon: 'solar-panel', description: 'Impianto fotovoltaico a isola' },
  { id: 71, category: 12, label: 'EVOQP01', icon: 'lightbulb', description: 'Linea elettrica da illuminazione' },
  { id: 72, category: 15, label: 'AGUIA-T1', icon: 'video' },
  { id: 73, category: 15, label: 'AGUIA-T2', icon: 'video' },
  { id: 74, category: 14, label: 'VRS-EVO-R', icon: 'tachometer-alt', description: 'Velocar Red&Speed EVO R', ministerialApproval: 'Decreto Prot.4708 del 01.08.2016' },
  { id: 75, category: 7, label: 'QNAP TS-212' },
  { id: 76, category: 7, label: 'QNAP TS-128' },
  { id: 77, category: 15, label: 'AGUIA-T5-5', icon: 'video', description: 'AGUIA-T5-5', ministerialApproval: 'Decreto Prot.47 del 01.03.2021' },
  { id: 78, category: 15, label: 'AGUIA-T3-3', icon: 'video' },
  { id: 79, category: 14, label: 'VRS-EVO-T12-5-RS4', icon: 'tachometer-alt' },
  { id: 80, category: 15, label: 'AGUIA-T9-5', icon: 'video' },
  { id: 81, category: 15, label: 'AGUIA-T12-5', icon: 'video' },
  { id: 82, category: 12, label: 'EVOQF02', icon: 'solar-panel', description: 'Impianto fotovoltaico a isola' },
  { id: 83, category: 12, label: 'EVOQF03', icon: 'solar-panel', description: 'Impianto fotovoltaico a isola' },
  { id: 84, category: 16, label: 'ZENITH 12V 200Ah' },
  { id: 85, category: 16, label: 'VICTRON 12V 230Ah' },
  { id: 86, category: 16, label: 'DISCOVERY 6V 230Ah' },
  { id: 87, category: 16, label: 'DISCOVERY 12V 85Ah' },
  { id: 88, category: 12, label: 'EVOQF04', icon: 'solar-panel', description: 'Impianto fotovoltaico a isola' },
  { id: 89, category: 14, label: 'VRS-EVO-T12-5', icon: 'video', description: 'VRS-EVO-T12-5', ministerialApproval: 'Decreto Prot.4708 del 01.08.2016\nEstensione Decreto Prot.129 del 07.04.2021' },
  { id: 90, category: 12, label: 'QL-24-001', icon: 'plug', description: 'Linea elettrica 230VAC' },
  { id: 91, category: 12, label: 'QL-24-002', icon: 'plug', description: 'Linea elettrica 230VAC' },
  { id: 92, category: 12, label: 'QF-24-003', icon: 'solar-panel', description: 'Impianto fotovoltaico a isola' },
  { id: 93, category: 12, label: 'QF-24-005', icon: 'solar-panel', description: 'Impianto fotovoltaico a isola' },
  { id: 94, category: 12, label: 'QP-12-002', icon: 'lightbulb', description: 'Linea elettrica da illuminazione' },
  { id: 97, category: 12, label: 'QP-12-003', icon: 'lightbulb', description: 'Linea elettrica da illuminazione' },
  { id: 95, category: 15, label: 'AGUIA-T5-5-R', icon: 'tachometer-alt', description: 'AGUIA-T5-5-R', ministerialApproval: 'Decreto Prot.48 del 01.03.2021' },
  { id: 96, category: 14, label: 'VRS-EVO-T12-5-R', icon: 'tachometer-alt', description: 'VRS EVO-R versione VRS-EVO-T12-5-R', ministerialApproval: 'Decreto Prot.4708 del 01.08.2016\nEstensione Decreto Prot.129 del 07.04.2021' },
  { id: 98, category: 15, label: 'STAR-V-T3-1', icon: 'video', description: 'STAR-V-T3-1', ministerialApproval: '' },
  { id: 99, category: 15, label: 'STAR-V-T2-2', icon: 'video', description: 'STAR-V-T2-2', ministerialApproval: '' },
  { id: 100, category: 15, label: 'STAR-V-T1-1', icon: 'video', description: 'STAR-V-T1-1', ministerialApproval: '' },
  { id: 101, category: 12, label: 'QB-24-001', icon: 'car-battery', description: 'VALIGETTA CON ROUTER E BATTERIE AL LITIO', ministerialApproval: '' },
  { id: 102, category: 12, label: 'QP-24-001', icon: 'lightbulb', description: 'QUADRO INPUBBLICA OUT 24VDC', ministerialApproval: '' },
  { id: 103, category: 15, label: 'STAR-V-T5-5', icon: 'video', description: 'STAR-V-T5-5', ministerialApproval: '' },
  { id: 104, category: 14, label: 'VRS-EVO-T5-5', icon: 'video', description: 'VRS-EVO-T5-5', ministerialApproval: '' },
];

export class DefaultItem {
  constructor() {
    this.code = '';
    this.siteId = '';
    this.description = '';
    this.refurbished = false;
    this.quantity = 0;
    this.price = 0.00;
    this.discount = 0;
    this.lanes = 0;
    this.red = 0;
    this.speed = 0;
    this.freeflow = 0;
    this.ztl = 0;
    this.media = 0;
    this.mmcr = false;
    this.totalDiscount = 0.00;
    this.totalAmount = 0.00;
  }
}

export function getModelIcon(model) {

  switch (model) {
    case 'AGUIA-T5-5-HR1':
    case 'AGUIA-T5-5-R-HR1':
    case 'AGUIA-T9-5-HR1':
    case 'STAR-V-T1-1':
    case 'STAR-V-T2-2':
    case 'STAR-V-T3-1':
    case 'STAR-V-T3-1-HR1':
    case 'STAR-V-T5-5-HR1':
      return 'camera-cctv';
    case 'QB-24-001':
      return 'suitcase';
    case 'QF-24-003':
    case 'QF-24-005':
      return 'solar-panel';
    case 'QF-PP-001':
      return 'car-battery';
    case 'QL-24-001':
    case 'QL-24-002':
      return 'plug';
    case 'QP-12-002':
    case 'QP-12-003':
    case 'QP-12-004':
    case 'QP-24-001':
      return 'lightbulb';
    case '0000001256':
      return 'camera-security'
    case '0000001266':
      return 'tablet-screen'
    case 'VRS-EVO-L0-HR0':
    case 'VRS-EVO-L0-HR1':
    case 'VRS-EVO-L1-HR0':
    case 'VRS-EVO-L1-HR1':
    case 'VRS-EVO-L2-HR0':
    case 'VRS-EVO-L2-HR1':
    case 'VRS-EVO-R-HR0':
    case 'VRS-EVO-R-HR1':
    case 'VRS-EVO-T12-5':
    case 'VRS-EVO-T12-5-R':
    case 'VRS-EVO-T12-5-RS4':
    case 'VRS-EVO-T5-5-HR0':
      return 'video'
    default:
      return 'cube';
  }
}

export function getNameAndSurname(users, username) {
  const user = users.find(item => item.username === username);

  if (user) {
    return `${user.name} ${user.surname}`;
  }

  return '';
}

export function updateSorting(array, key) {
  const newArray = [...array];
  const index = newArray.findIndex(item => item[0] === key);

  if (index !== -1) {
    if (newArray[index][1] === 1) {
      newArray[index][1] = -1;
    } else {
      newArray.splice(index, 1);
    }
  } else {
    newArray.push([key, 1]);
  }

  return newArray;
}

export function getModelLabelById(id) {
  try {
    return models.find(obj => obj.id === id).label;
  } catch (e) {
    return '';
  }
}

export function getEuroFromNumber(number) {
  if (number) {
    const euro = number.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });

    return euro;
  }
  return '0,00 €'
}

export function getKbFromBytes(bytes) {
  const kilobytes = Math.ceil(bytes / 1024);

  return kilobytes;
}

export function isVideoFile(type) {
  switch (type) {
    case 'video/avi':
    case 'video/mp4':
    case 'video/quicktime':
      return true;
    default:
      return false;
  }
}

export function isPdfFile(type) {
  switch (type) {
    case 'application/pdf':
      return true;
    default:
      return false;
  }
}

export function isTextFile(type) {
  switch (type) {
    case '':
    case 'text/plain':
    case 'application/vnd.ms-excel':
      return true;
    default:
      return false;
  }
}

export function isImageFile(type) {
  switch (type) {
    case 'image/png':
    case 'image/jpeg':
    case 'image/gif':
      return true;
    default:
      return false;
  }
}

export function getLabelFromValues(column, value) {
  const result = column.values.find(v => v[column.valuesKey] === value);

  return result ? result[column.valuesLabel] : '';
}

export function getLocatDateTimeFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}
export function capitalize(word) {
  return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
}

export function capitalizeCityLabel(string) {
  if (!string) return '';

  const words = string.toLowerCase().split(' ');
  const prepositions = ['di', 'a', 'da', 'in', 'con', 'su', 'per', 'tra', 'fra'];
  const partitive = ['del', 'dello', 'dei', 'della', 'delle', 'degli'];
  const saints = ['sant'];

  const result = words.map(word => {
    const normalized = word
      .replace("a'", 'à')
      .replace("e'", 'è')
      .replace("i'", 'ì')
      .replace("o'", 'ò')
      .replace("u'", 'ù')

    if (prepositions.includes(word) || partitive.includes(word)) {
      return word;
    } else if (normalized.includes("'")) {
      const parts = normalized.split("'");

      if (saints.includes(parts[0])) {
        return `${capitalize(parts[0])}'${capitalize(parts[1])}`
      }

      return `${parts[0]}'${capitalize(parts[1])}`
    }

    return `${capitalize(normalized)}`
  });


  return result.join(' ');
}

export function capitalizeName(string) {
  if (string) {
    const words = string.toLowerCase().split(' ');

    const result = words.map(word => {
      const normalized = word
        .replace("a'", 'à')
        .replace("e'", 'è')
        .replace("i'", 'ì')
        .replace("o'", 'ò')
        .replace("u'", 'ù')

      if (normalized.includes("'")) {
        const parts = normalized.split("'");

        return `${parts[0]}'${capitalize(parts[1])}`
      }

      return `${capitalize(normalized)}`
    });

    return result.join(' ');
  }

  return '';
}

export function getProvinceAndRegionFromCity(city) {
  if (city) {
    const province = city.pvdescri ? city.pvdescri : '';
    const region = city.rsdescri ? city.rsdescri : '';

    return `${capitalizeName(province)} - ${region}`;
  }

  return '';
}

export function parseCoordinates(latitude, longitude) {
  function setValue(value) {
    value = Math.round(value * 100000000) / 100000000;

    return (value > 0) ? `+${value}°` : value;
  }

  if (latitude && longitude) {
    return `${setValue(latitude)}, ${setValue(longitude)}`;
  }

  return '';
}

export function validateCoordinates(coordinates) {
  // Espressione regolare per verificare il formato delle coordinate
  const regex = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

  // Verifica se la stringa corrisponde al formato delle coordinate
  if (regex.test(coordinates)) {
    return true;
  } else {
    return false;
  }
}
