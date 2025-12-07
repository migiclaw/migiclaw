import { GraphData } from './types';

export const INITIAL_DATA: GraphData = {
  nodes: [
    { 
      id: 'ye_wenjie', 
      name: 'Ye Wenjie', 
      cnName: '叶文洁', 
      description: 'Astrophysicist, initiator of the contact with Trisolaris.', 
      cnDescription: '天体物理学家，E.T.O统帅，向三体文明发送了第一条信息。',
      group: 'eto', 
      val: 10 
    },
    { 
      id: 'wang_miao', 
      name: 'Wang Miao', 
      cnName: '汪淼', 
      description: 'Nanomaterials researcher, photographer.', 
      cnDescription: '纳米材料专家，古筝计划的核心贡献者。',
      group: 'human', 
      val: 8 
    },
    { 
      id: 'shi_qiang', 
      name: 'Da Shi', 
      cnName: '史强', 
      description: 'Police officer, insightful and practical.', 
      cnDescription: '警察，观察力敏锐，负责保护重要科学家。',
      group: 'human', 
      val: 9 
    },
    { 
      id: 'luo_ji', 
      name: 'Luo Ji', 
      cnName: '罗辑', 
      description: 'Wallfacer, sociologist, holder of the sword.', 
      cnDescription: '面壁者，社会学家，建立了黑暗森林威慑。',
      group: 'human', 
      val: 10 
    },
    { 
      id: 'cheng_xin', 
      name: 'Cheng Xin', 
      cnName: '程心', 
      description: 'Aerospace engineer, second Swordholder.', 
      cnDescription: '航天工程师，第二任执剑人，圣母心泛滥。',
      group: 'human', 
      val: 9 
    },
    { 
      id: 'yun_tianming', 
      name: 'Yun Tianming', 
      cnName: '云天明', 
      description: 'Sent to the Trisolaran fleet as a brain.', 
      cnDescription: '阶梯计划执行人，大脑被送往三体舰队，送回了三个童话。',
      group: 'human', 
      val: 8 
    },
    { 
      id: 'zhang_beihai', 
      name: 'Zhang Beihai', 
      cnName: '章北海', 
      description: 'Naval officer, founder of the Galactic Humans.', 
      cnDescription: '中国太空军政委，坚定的逃亡主义者，星舰人类之父。',
      group: 'human', 
      val: 8 
    },
    { 
      id: 'evans', 
      name: 'Mike Evans', 
      cnName: '麦克·伊文斯', 
      description: 'Heir to oil fortune, ETO funder.', 
      cnDescription: '物种共产主义者，E.T.O 降临派核心，审判日号拥有者。',
      group: 'eto', 
      val: 7 
    },
    { 
      id: 'yang_dong', 
      name: 'Yang Dong', 
      cnName: '杨冬', 
      description: 'Theoretical physicist, daughter of Ye Wenjie.', 
      cnDescription: '理论物理学家，叶文洁之女，因物理学不存在而自杀。',
      group: 'human', 
      val: 5 
    },
    { 
      id: 'ding_yi', 
      name: 'Ding Yi', 
      cnName: '丁仪', 
      description: 'Theoretical physicist.', 
      cnDescription: '理论物理学家，在接触水滴时牺牲。',
      group: 'human', 
      val: 6 
    },
    { 
      id: 'soph_on', 
      name: 'Sophon', 
      cnName: '智子', 
      description: 'Trisolaran android representative.', 
      cnDescription: '三体文明在地球的潜伏者和传声筒，仿生机器人。',
      group: 'trisolaran', 
      val: 7 
    },
    { 
      id: 'wade', 
      name: 'Thomas Wade', 
      cnName: '托马斯·维德', 
      description: 'PIA Chief, ruthless strategist.', 
      cnDescription: 'PIA局长，前进！前进！！不择手段的前进！！！',
      group: 'human', 
      val: 8 
    },
    { 
      id: 'aa', 
      name: 'AA', 
      cnName: '艾AA', 
      description: 'Cheng Xin\'s friend and partner.', 
      cnDescription: '天文学博士，程心的挚友和守护者。',
      group: 'human', 
      val: 5 
    },
    { 
      id: 'guan_yifan', 
      name: 'Guan Yifan', 
      cnName: '关一帆', 
      description: 'Civilization explorer.', 
      cnDescription: '万有引力号学者，与程心一同进入小宇宙。',
      group: 'human', 
      val: 5 
    },
    { 
      id: 'shen_yufei', 
      name: 'Shen Yufei', 
      cnName: '申玉菲', 
      description: 'Physicist, member of Frontiers of Science.', 
      cnDescription: '日籍物理学家，科学边界成员，降临派。',
      group: 'eto', 
      val: 6 
    },
    { 
      id: 'pan_han', 
      name: 'Pan Han', 
      cnName: '潘寒', 
      description: 'Biologist, ETO member.', 
      cnDescription: '著名生物学家，降临派激进分子。',
      group: 'eto', 
      val: 5 
    },
    { 
      id: 'chang_weisi', 
      name: 'General Chang', 
      cnName: '常伟思', 
      description: 'General of the PLA.', 
      cnDescription: '中国军方高级将领，古筝计划指挥者。',
      group: 'human', 
      val: 6 
    },
    { 
      id: 'singer', 
      name: 'Singer', 
      cnName: '歌者', 
      description: 'Low-level entity cleaning the universe.', 
      cnDescription: '宇宙清理员，随手抛出了二向箔。',
      group: 'other', 
      val: 6 
    },
    { 
      id: 'lei_zhicheng', 
      name: 'Lei Zhicheng', 
      cnName: '雷志成', 
      description: 'Political commissar at Red Coast Base.', 
      cnDescription: '红岸基地政委，企图独占外星信号的秘密。',
      group: 'human', 
      val: 4 
    },
    { 
      id: 'wei_cheng', 
      name: 'Wei Cheng', 
      cnName: '魏成', 
      description: 'Math prodigy, husband of Shen Yufei.', 
      cnDescription: '数学天才，沉迷于三体问题的计算。',
      group: 'human', 
      val: 4 
    },
  ],
  links: [
    { source: 'ye_wenjie', target: 'yang_dong', value: 1 }, 
    { source: 'ye_wenjie', target: 'evans', value: 2 }, 
    { source: 'ye_wenjie', target: 'lei_zhicheng', value: 5 }, 
    { source: 'wang_miao', target: 'shi_qiang', value: 2 }, 
    { source: 'wang_miao', target: 'ding_yi', value: 4 }, 
    { source: 'wang_miao', target: 'shen_yufei', value: 5 }, 
    { source: 'wang_miao', target: 'ye_wenjie', value: 3 }, 
    { source: 'luo_ji', target: 'shi_qiang', value: 1 }, 
    { source: 'luo_ji', target: 'ye_wenjie', value: 6 }, 
    { source: 'cheng_xin', target: 'yun_tianming', value: 1 }, 
    { source: 'cheng_xin', target: 'aa', value: 2 }, 
    { source: 'cheng_xin', target: 'wade', value: 4 }, 
    { source: 'cheng_xin', target: 'guan_yifan', value: 2 }, 
    { source: 'cheng_xin', target: 'soph_on', value: 5 }, 
    { source: 'cheng_xin', target: 'luo_ji', value: 4 }, 
    { source: 'zhang_beihai', target: 'chang_weisi', value: 4 }, 
    { source: 'ding_yi', target: 'yang_dong', value: 1 }, 
    { source: 'shen_yufei', target: 'wei_cheng', value: 2 }, 
    { source: 'shen_yufei', target: 'pan_han', value: 3 }, 
    { source: 'soph_on', target: 'luo_ji', value: 3 }, 
    { source: 'singer', target: 'luo_ji', value: 9 }, 
  ]
};