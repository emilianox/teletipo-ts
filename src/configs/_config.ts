interface ConstantsConfig {
  commmandInfo: string;
  secret: string;
  logSheet: string;
  supervacaID: number;
  keyboard: string[][];
  testUser: {
    username: string;
    id: number;
  };
  googleAppScript: {
    project_name: string;
    id_gapps: string;
  };
}


const CONSTANTS: ConstantsConfig = {
  commmandInfo: "/sendInfo",
  secret: "432423442:fd1USioffhds5ifhishfpidfihodsofhdi8",
  logSheet: "yourbot-logs",
  supervacaID: 1000000,
  keyboard: [["/test"], ],
  testUser: {
    username: "youruser",
    id: 1000000
  },
  googleAppScript: {
    project_name: "appproyectname",
    id_gapps: "dfshgsofihs23-Y86Nss-MIHSUHDHUHdeifyuhhfihdsifdhi33437rbu"
  }
};

interface Exports {
  CONSTANTS: {};
}

declare var exports: Exports;

if (typeof exports !== "undefined" && exports !== null) {
  exports.CONSTANTS = CONSTANTS;
}
