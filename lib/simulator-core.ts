// Core DNA SAT Simulator Logic
class Strand {
  seq: string[];
  id: any;

  constructor(seq: string[] | any, id: any = null) {
    this.seq = Array.isArray(seq) ? seq : [...seq];
    this.id = id;
  }

  toString() {
    return this.seq.join("|");
  }

  equals(other: Strand) {
    if (this.seq.length !== other.seq.length) return false;
    return this.seq.every((v, i) => v === other.seq[i]);
  }

  toAssignment(numVars: number) {
    const assignment: Record<number, boolean> = {};
    for (let i = 0; i < numVars; i++) {
      const token = this.seq[i];
      const varNum = i + 1;
      assignment[varNum] = !token.startsWith("!");
    }
    return assignment;
  }
}

class Encoder {
  encodeVariable(varNum: number, negated = false) {
    return negated ? `!v${varNum}` : `v${varNum}`;
  }

  encodeCNF(cnf: number[][], numVars: number) {
    return {
      numVars,
      clauses: cnf,
      varTokens: Array.from({ length: numVars }, (_, i) => ({
        pos: this.encodeVariable(i + 1, false),
        neg: this.encodeVariable(i + 1, true),
      })),
    };
  }
}

class Population {
  generateFull(numVars: number) {
    const strands: Strand[] = [];
    const total = Math.pow(2, numVars);

    for (let i = 0; i < total; i++) {
      const seq: string[] = [];
      for (let v = 0; v < numVars; v++) {
        const bit = (i >> v) & 1;
        seq.push(bit ? `v${v + 1}` : `!v${v + 1}`);
      }
      strands.push(new Strand(seq, i));
    }

    return strands;
  }

  generateSample(numVars: number, sampleSize: number, seed = 42) {
    const strands: Strand[] = [];
    let rng = seed;

    const random = () => {
      rng = (rng * 1103515245 + 12345) & 0x7fffffff;
      return rng / 0x7fffffff;
    };

    for (let i = 0; i < sampleSize; i++) {
      const seq: string[] = [];
      for (let v = 0; v < numVars; v++) {
        const bit = random() > 0.5;
        seq.push(bit ? `v${v + 1}` : `!v${v + 1}`);
      }
      strands.push(new Strand(seq, i));
    }

    return strands;
  }
}

class MolecularOps {
  selectByClause(population: Strand[], clause: number[], numVars: number) {
    const survivors: Strand[] = [];

    for (const strand of population) {
      let satisfied = false;

      for (const literal of clause) {
        const varNum = Math.abs(literal);
        const isNegated = literal < 0;
        const token = isNegated ? `!v${varNum}` : `v${varNum}`;

        if (strand.seq[varNum - 1] === token) {
          satisfied = true;
          break;
        }
      }

      if (satisfied) {
        survivors.push(strand);
      }
    }

    return survivors;
  }

  amplify(population: Strand[], factor: number) {
    const amplified: Strand[] = [];
    for (const strand of population) {
      for (let i = 0; i < factor; i++) {
        amplified.push(strand);
      }
    }
    return amplified;
  }
}

export default class Simulator {
  cnf: number[][];
  numVars: number;
  encoder: Encoder;
  population: Population;
  ops: MolecularOps;
  encoded: any;
  config: any;
  steps: any[];
  currentStep: number;

  constructor(cnf: number[][], numVars: number, config: any = {}) {
    this.encoder = new Encoder();
    this.population = new Population();
    this.ops = new MolecularOps();

    this.cnf = cnf;
    this.numVars = numVars;
    this.encoded = this.encoder.encodeCNF(cnf, numVars);

    this.config = {
      mode: config.mode || "full",
      sampleSize: config.sampleSize || 1000,
      amplificationFactor: config.amplificationFactor || 2,
      seed: config.seed || 42,
      ...config,
    };

    this.steps = [];
    this.currentStep = 0;
  }

  run() {
    const startTime = Date.now();

    let pop =
      this.config.mode === "full" && this.numVars <= 15
        ? this.population.generateFull(this.numVars)
        : this.population.generateSample(
            this.numVars,
            this.config.sampleSize,
            this.config.seed
          );

    this.steps.push({
      step: 0,
      type: "init",
      population: pop,
      size: pop.length,
      description: `Initial population generated (${this.config.mode} mode)`,
    });

    for (let i = 0; i < this.cnf.length; i++) {
      const clause = this.cnf[i];

      pop = this.ops.selectByClause(pop, clause, this.numVars);

      this.steps.push({
        step: this.steps.length,
        type: "select",
        clauseIndex: i,
        clause: clause,
        population: pop,
        size: pop.length,
        description: `Filter by clause ${i + 1}: (${clause.join(" ∨ ")})`,
      });

      if (pop.length === 0) break;

      if (this.config.amplificationFactor > 1) {
        pop = this.ops.amplify(pop, this.config.amplificationFactor);
        this.steps.push({
          step: this.steps.length,
          type: "amplify",
          population: pop,
          size: pop.length,
          description: `Amplify by factor ${this.config.amplificationFactor}`,
        });
      }
    }

    const endTime = Date.now();

    const uniqueAssignments = new Map();
    for (const strand of pop) {
      const key = strand.toString();
      if (!uniqueAssignments.has(key)) {
        uniqueAssignments.set(key, strand.toAssignment(this.numVars));
      }
    }

    return {
      satisfiable: pop.length > 0,
      assignments: Array.from(uniqueAssignments.values()),
      steps: this.steps,
      runtime: endTime - startTime,
      finalPopulationSize: pop.length,
    };
  }
}
